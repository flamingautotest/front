import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { APIContext, UserContext } from '~/stores'
import { Footer, LoginGuard, Button, Modal } from '~/components'
import { joinClassNames } from '~/utils'
import { useMockData } from '~/hooks'

export default function ProjectDetail() {
    const router = useRouter()
    const { projectId } = router.query
    const { getMockData } = useMockData()
    const { apiState, makeRequest } = useContext(APIContext)
    const { userState } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (userState.isLoggedIn && projectId.length) {
            const call = async () => {
                const testSuitesMock = await getMockData('testSuites')
                await makeRequest({
                    path: `/projects/${projectId}/test-suites`,
                    modifier: state => {
                        state.testSuites = testSuitesMock
                    }
                })
            }
            call()
        }
    }, [userState])

    return (
        <LoginGuard>
            {showModal ?
                <Modal onClose={() => setShowModal(false)} />
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
                        <h2 className='text-3xl font-sans'>Project name</h2>
                    </div>
                    <Button
                        size={'xl'}
                        type={'white'}
                        onClick={() => setShowModal(true)}
                        className='text-white bg-white text-xs'
                    >
                        {'Create new test suite +'}
                    </Button>
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
                            <th className='text-left'>Actions count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiState.testSuites.map(testSuite => (
                            <Link key={testSuite.id} href={`/projects/${projectId}/suite/${testSuite.id}`}>                
                                <tr className='h-16 cursor-pointer border-gray-200 border-b text-gray-600 text-xs sm:text-base' >
                                    <td>{testSuite.id}</td>
                                    <td>{testSuite.name}</td>
                                    <td>{testSuite.testActionsList.length}</td>
                                </tr>
                            </Link>
                        ))}
                    </tbody>
                </table>
                <div className='w-full flex justify-center text-gray-400'>
                    <p className='mr-12'>Rows per page:</p>
                    <p className='mr-12'>1-5 of 13</p>
                    <p className='text-2xl'>{'<   >'}</p>
                </div>
                <Footer />
            </div>
        </LoginGuard>
    )
}