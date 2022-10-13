import { useContext, useEffect, useState } from 'react'
import { Button, Footer, LoginGuard } from '~/components'
import { APIContext, UserContext } from '~/stores'
import Fuse from 'fuse.js'
import Link from 'next/link'

export default function ProjectList() {
    const [searchInput, setSearchInput] = useState('')
    const [filteredProjects, setFilteredProjects] = useState([])
    const { apiState, makeRequest } = useContext(APIContext)
    const { userState } = useContext(UserContext)

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

                setFilteredProjects(apiState.projects)
            }
            call()
        }
    }, [userState])

    useEffect(() => {
        if (apiState.projects.length) {
            setFilteredProjects(apiState.projects)
        }
    }, [apiState.projects])

    useEffect(() => {
        if (apiState.projects.length) {
            if (searchInput.length) {
                const fuse = new Fuse(apiState.projects, {
                    keys: ['name', 'id']
                })
                const result = fuse.search(searchInput)
                setFilteredProjects(result.map(r => r.item))
            } else {
                setFilteredProjects(apiState.projects)
            }
        }
    }, [searchInput])

    return (
        <LoginGuard>
            <div className='w-full mt-10'>
                <div className='flex w-full justify-between items-start mb-8 sm:mb-16'>
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
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
                <table className='w-full m-0 sm:mb-16 whitespace-nowrap text-xs sm:text-base' >
                    <thead className='h-16 border-gray-200 border-b text-gray-600 '>
                        <tr>
                        <th className='text-left'>Id</th>
                        <th className='text-left'>Name</th>
                        <th className='text-left'>Suite counts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!apiState.isLoading && apiState.projects && filteredProjects.length) ? filteredProjects.map(project => (
                            <Link key={project.id} href={`/projects/${project.id}`}>                
                                <tr className='h-16 cursor-pointer border-gray-200 border-b text-gray-600 text-xs sm:text-base' >
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.test_suite_references?.length ? project.test_suite_references.length : '0'}</td>
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