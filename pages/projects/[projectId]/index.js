import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { APIContext, UserContext } from '~/stores'
import { Footer, LoginGuard, Button, NewSuiteModal, Input } from '~/components'

export default function ProjectDetail() {
    const router = useRouter()
    const { projectId } = router.query
    const { apiState, makeRequest } = useContext(APIContext)
    const { userState } = useContext(UserContext)
    const [isModified, setIsModified]  = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [testSuiteList, setTestSuiteList] = useState([])
    const [projectName, setProjectName] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [filteredTestSuites, setFilteredTestSuites] = useState([])

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
            setFilteredTestSuites(list.test_suite_references)
        }
        if (apiState.projects.find(p => p.id === projectId)?.name) setProjectName(apiState.projects.find(p => p.id === projectId).name)
    }, [apiState.projects, projectId])

    const submitNewSuite = async (data) => {
        if (Object.keys(data).length <= 0) {
            setShowModal(false)
            return
        }

        const { name, url } = data
        if (name.length > 0 && url.length > 0) {
            await makeRequest({
                method: 'post',
                path: `/projects/${projectId}/suites/`,
                data: { name, url, actions: [] }
            })
        }

        setShowModal(false)
    }

    const deleteProjects = async ({}) => {
        const cancel = confirm('Are you sure you want to delete this project?')
        if (!cancel) return

        await makeRequest({ method: 'delete', path: `/projects/${projectId}/` })
        router.push('/projects')
    }

    const updateProjectTitle = async ({}) => {
        if (isModified){
            await makeRequest({
                method: 'patch',
                path: `/projects/${projectId}/`,
                data: {
                    name : projectName
                },
                modifier: (state, response) => {
                    state.projects = state.projects.map(p => p.id === projectId ? response : p)
                }
            })

            return setIsModified(false)
        }

        return setIsModified(true)
    }

    useEffect(() => {
        if (testSuiteList.length) {
            if (searchInput.length) {
                const fuse = new Fuse(testSuiteList, {
                    keys: ['name', 'id']
                })
                const result = fuse.search(searchInput)
                setFilteredTestSuites(result.map(r => r.item))
            } else {
                setFilteredTestSuites(testSuiteList)
            }
        }
    }, [searchInput])

    return (
        <LoginGuard>
            {showModal ?
                <NewSuiteModal onClose={submitNewSuite} />
            : null}

            <div className='w-full mt-10'>
                <div className='sm:flex w-full justify-between items-start mb-16'>
                    <div>
                        <Link href='/projects'>
                            <a className='text-blue'>
                                {'< Back'}
                            </a>
                        </Link>
                        <div className='flex flex-row justify-center items-center mt-8'>
                            {isModified ?
                                <div className='flex flex-row items-center justify-center'>
                                    <Input
                                        type="text"
                                        className=""
                                        placeholder="New name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                    <Button
                                        className={'h-10 mt-0 mx-1'}
                                        type={'white'}
                                        size={'s'}
                                        onClick={() => {
                                            setIsModified(false)
                                            setProjectName(apiState.projects.find(p => p.id === projectId).name)
                                        }}
                                    >
                                        {'Cancel'}
                                    </Button>
                                </div>
                            :
                                <h2 className='text-3xl font-sans'>{apiState.projects.find(p => p.id === projectId)?.name ? apiState.projects.find(p => p.id === projectId).name : 'Loading...'}</h2>
                            }
                            <Button
                                size={'s'}
                                type={'warning'}
                                onClick={() => updateProjectTitle()}
                                className='text-blue bg-white text-xs py-0'
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
                            className={'text-red bg-white text-xs'}
                        >
                            {'delete project'}
                        </Button>
                    </div>
                </div>
                <div className="sm:flex items-center w-full mb-8">
                    <div className="flex border border-gray-200 rounded w-full h-12">
                        <input
                            type="text"
                            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
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
                        {(!apiState.isLoading && testSuiteList.length && filteredTestSuites.length) ? filteredTestSuites.map(testSuite => (
                            <Link key={testSuite.id} href={`/projects/${projectId}/suite/${testSuite.id}`}>                
                                <tr className='h-16 cursor-pointer border-gray-200 border-b text-gray-600 text-xs sm:text-base' >
                                    <td>{testSuite.id}</td>
                                    <td>{testSuite.name}</td>
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