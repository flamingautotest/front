import { useContext, useEffect } from 'react'
import { Button, Footer, LoginGuard } from '~/components'
import { APIContext, UserContext } from '~/stores'
import { useMockData } from '~/hooks'
import Link from 'next/link'

export default function ProjectList() {
    const { getMockData } = useMockData()
    const { apiState, getProjects, makeRequest } = useContext(APIContext)
    const { userState } = useContext(UserContext)

    useEffect(() => {
        if (userState.isLoggedIn) {
            const call = async () => {
                const projectsMock = await getMockData('projects')
                await makeRequest({
                    path: '/projects',
                    modifier: state => {
                        state.projects = projectsMock
                    }
                })
            }
            call()
        }
    }, [userState])

    return (
        <LoginGuard>
            <div className='w-full mt-10'>
                <div className='flex w-full justify-between items-start mb-16'>
                    <div>
                        <h2 className='text-3xl  font-sans'>Projects</h2>
                        <p className='text-gray-400'>{apiState.projects?.length} projects</p>
                    </div>
                    <Link href='/upload'>
                        <a>
                            <Button
                                size={'xl'}
                                type={'white'}
                                className='text-white bg-white text-xs'
                            >
                                {'Create new project +'}
                            </Button>
                        </a>
                    </Link>
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
                <table className='w-full m-0 mb-16'>
                    <thead className='h-16 border-gray-200 border-b text-gray-600'>
                        <tr>
                        <th className='text-left'>Id</th>
                        <th className='text-left'>Name</th>
                        <th className='text-left'>Suite counts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiState.projects && apiState.projects.map(project => (
                            <Link key={project.id} href={`/projects/${project.id}`}>                
                                <tr className='h-16 cursor-pointer border-gray-200 border-b text-gray-600 text-xs sm:text-base' >
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.testSuitesReferences.length}</td>
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