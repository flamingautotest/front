import { TestItem, TestEditor, Footer, LoginGuard, Button, EndpointSelector } from '~/components'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { UserContext, APIContext } from '~/stores'

export default function TestSuite() {
    const router = useRouter()
    const { projectId, testSuiteId } = router.query
    const { userState } = useContext(UserContext)
    const { apiState, makeRequest } = useContext(APIContext)
    const [currentTest, setCurrentTest] = useState(null)
    const [endpointModal, setEndpointModal] = useState(false)

    useEffect(() => {
        if (userState.isLoggedIn && projectId && testSuiteId) {
            const call = async () => {
                await makeRequest({
                    path: '/projects/',
                    modifier: (state, response) => {
                        state.projects = response
                    }
                })
                await makeRequest({
                    path: `/projects/${projectId}/suites/${testSuiteId}/`,
                    modifier: (state, response) => {
                        state.tests = response
                    }
                })
                await makeRequest({
                    path: `/projects/${projectId}/endpoints/`,
                    modifier: (state, response) => {
                        state.endpoints = [...response]
                    }
                })
            }
            call()
        }
    }, [userState, projectId, testSuiteId])

    const addNewTest = (data) => {
        if (Object.keys(data).length <= 0) return

        const newState = {
            ...apiState.tests,
            actions: [...apiState.tests.actions, data]
        }

        makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: newState,
            modifier: state => {
                state.tests = newState
            }
        })
    }

    const deleteSuite = async ({}) => {
        const cancel = confirm('Are you sure you want to delete this test suite?')
        if (!cancel) return

        await makeRequest({
            method: 'delete',
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
        })
        router.push(`/projects/${projectId}`)
    }

    return (
        <LoginGuard>
            {endpointModal ?
                <EndpointSelector data={apiState.endpoints} onClose={data => {
                    addNewTest(data)
                    setEndpointModal(false)
                }} />
            : null}

            <div className='w-full flex flex-row justify-between'>
                <div className='w-[48%] flex flex-col'>
                    <div className='flex mb-16 mt-10'>
                        <div>
                            <Link href={`/projects/${projectId}`}>
                                <a className='text-blue'>
                                    {'< Back'}
                                </a>
                            </Link>
                            <Button
                                size={'s'}
                                type={'warning'}
                                onClick={() => deleteSuite()}
                                className='text-red bg-white text-xs'
                            >
                                {'delete suite'}
                            </Button>
                            {/* TODO: make this dynamic */}
                            <h2 className='text-3xl  font-sans'>{`${(!apiState.isLoading && apiState.projects?.find(p => p.id === projectId)?.title) ? apiState.projects.find(p => p.id === projectId).title : 'Loading...'} > ${apiState.tests.title}`}</h2>
                        </div>
                    </div>
                    {apiState.tests?.actions?.length ? apiState.tests.actions.map((test, index) => (
                        <TestItem
                            key={index}
                            name={test.description}
                            method={test.request.method}
                            onClick={() => setCurrentTest(test)}
                        />
                    )) : null}
                    <div className='w-full text-center mt-4'>
                        <Button
                            size={'xl'}
                            type={'white'}
                            onClick={() => setEndpointModal(true)}
                            className='text-white bg-white text-xs'
                        >
                            {'Add new test +'}
                        </Button>
                    </div>
                </div>
                <div className='w-1/2'>
                    <TestEditor selected={currentTest} />
                </div>
            </div>
            <Footer className={'bottom-0'}/>
        </LoginGuard>
    )
}