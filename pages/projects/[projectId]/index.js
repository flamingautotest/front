import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { APIContext, UserContext } from '~/stores'
import { Footer, LoginGuard, Button, Modal } from '~/components'

export default function ProjectDetail() {
    const router = useRouter()
    const { projectId } = router.query
    const { apiState, makeRequest } = useContext(APIContext)
    const { userState } = useContext(UserContext)
    const  [isModified, setIsModified]  = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [testSuiteList, setTestSuiteList] = useState([])
    const [projectName, setProjectName] = useState('')

    useEffect(() => {
        if (userState.isLoggedIn) {
            const call = async () => {
                await makeRequest({
                    path: '/projects/',
                    modifier: (state, response) => {
                        state.projects = response
                        state.tests = {}
                        state.endpoints = []
                    }
                })
            }
            call()
        }
    }, [userState, showModal])

    useEffect(() => {
        const list = apiState.projects.find(p => p.id === projectId)
        if (list?.test_suite_references?.length > 0) {
            setTestSuiteList(list.test_suite_references)
        }
    }, [apiState.projects, projectId])

    const submitNewSuite = async (data) => {
        if (Object.keys(data).length <= 0) {
            setShowModal(false)
            return
        }

        const { title, url } = data
        if (title.length > 0 && url.length > 0) {
            await makeRequest({
                method: 'post',
                path: `/projects/${projectId}/suites/`,
                data: { title, url, actions: [] }
            })
        }

        setShowModal(false)
    }

    const deleteProjects = async ({}) => {
        const cancel = confirm('Are you sure you want to delete this project?')
        if (!cancel) return

        await makeRequest({
            method: 'delete',
            path: `/projects/${projectId}/`,
        })
        router.push('/projects')
    }

    const updateProjectTitle = async ({}) => {
        if (isModified){
            await makeRequest({
                method: 'patch',
                path: `/projects/${projectId}/`,
                data: {
                    title : projectName
                }
            })
            return setIsModified(!isModified)
        }
        return setIsModified(!isModified)
    }

    const maybeRenderTitleEdit = () => {
        if (isModified) {
            return(
                <input
                    type="text"
                    className="mt-8 block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="New Name:"
                    onChange={(e) => setProjectName(e.target.value)}
                />
            )
        }
        return(
            <h2 className=' mt-8 text-3xl font-sans'>{apiState.projects.find(p => p.id === projectId)?.title ? apiState.projects.find(p => p.id === projectId).title : 'Loading...'}</h2>
        )
    }

    return (
        <LoginGuard>
            {showModal ?
                <Modal onClose={submitNewSuite} />
            : null}

            <div className='w-full mt-10'>
                <div className='flex w-full justify-between items-start mb-16'>
                    <div>
                        <Link href='/projects'>
                            <a className='text-blue'>
                                {'< Back'}
                            </a>
                        </Link>
                        {/* TODO: make this dynamic */}
                        <div className='flex'>
                            {maybeRenderTitleEdit()}
                            <Button
                            size={'s'}
                            type={'warning'}
                            onClick={() => updateProjectTitle()}
                            className='text-blue bg-white text-xs mt-10'
                        >
                            {'update name'}
                        </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            size={'xl'}
                            type={'white'}
                            onClick={() => setShowModal(true)}
                            className='text-white bg-white text-xs'
                        >
                            {'Create new test suite +'}
                        </Button>
                        <Button
                            size={'s'}
                            type={'warning'}
                            onClick={() => deleteProjects()}
                            className='text-red bg-white text-xs'
                        >
                            {'delete project'}
                        </Button>
                    </div>
                </div>
                <div className="flex items-center w-full mb-8">
                    <div className="flex border border-gray-200 rounded w-full h-12">
                        <input
                            type="text"
                            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <table className='w-full m-0 mb-8 sm:mb-16'>
                    <thead className='h-16 border-gray-200 border-b text-gray-600 text-xs sm:text-base'>
                        <tr>
                            <th className='text-left'>Id</th>
                            <th className='text-left'>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!apiState.isLoading ? testSuiteList.map(testSuite => (
                            <Link key={testSuite.id} href={`/projects/${projectId}/suite/${testSuite.id}`}>                
                                <tr className='h-16 cursor-pointer border-gray-200 border-b text-gray-600 text-xs sm:text-base' >
                                    <td>{testSuite.id}</td>
                                    <td>{testSuite.title}</td>
                                </tr>
                            </Link>
                        )) : null}
                    </tbody>
                </table>
                <Footer />
            </div>
        </LoginGuard>
    )
}