import { TestItem, TestEditor, Footer, LoginGuard, Button, EndpointSelector, Input } from '~/components'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { UserContext, APIContext } from '~/stores'
import PictoIllustration from '~/assets/icons8-crayon-100.png'
import Image from 'next/image'

export default function TestSuite() {
    const router = useRouter()
    const { projectId, testSuiteId } = router.query
    const { userState } = useContext(UserContext)
    const { apiState, makeRequest } = useContext(APIContext)
    const [currentTest, setCurrentTest] = useState(null)
    const [endpointModal, setEndpointModal] = useState(false)
    const [isModified, setIsModified] = useState(false)
    const [suiteName, setSuiteName] = useState('')

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
                        const _response = { ...response, actions: response.actions?.map((r, i) => ({ ...r, id: i })) }
                        state.tests = _response
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

    useEffect(() => {
        setSuiteName(apiState.tests.name)
        setExecStatus(apiState.tests.exec_status)
    }, [apiState.tests])

    const addNewTest = async (data) => {
        if (Object.keys(data).length <= 0) return

        const newState = {
            ...apiState.tests,
            actions: [...apiState.tests.actions, data]
        }

        await makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: newState,
            modifier: state => {
                state.tests = newState
            }
        })
    }

    const deleteSuite = async () => {
        const cancel = confirm('Are you sure you want to delete this test suite?')
        if (!cancel) return

        await makeRequest({
            method: 'delete',
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            modifier: (state) => {
                const newState = state.projects[state.projects.findIndex(p => p.id === projectId)].test_suite_references.filter(s => s.id !== testSuiteId)
                state.projects[state.projects.findIndex(p => p.id === projectId)].test_suite_references = newState
            }
        })

        router.push(`/projects/${projectId}`)
    }

    async function moveUp(index) {
        const tempTable = Array.from(apiState.tests.actions)

        if (index > 0) {
            var el = tempTable[index];
            tempTable[index] = tempTable[index - 1];
            tempTable[index - 1] = el;
        }

        const newState = {
            ...apiState.tests,
            actions: tempTable
        }

        await makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: newState,
            modifier: state => {
                state.tests = newState
            }
        })
    }
    
    async function moveDown(index) {
        const tempTable = Array.from(apiState.tests.actions)

        if (index < tempTable.length - 1) {
          var el = tempTable[index];
          tempTable[index] = tempTable[index + 1];
          tempTable[index + 1] = el;
        }

        const newState = {
            ...apiState.tests,
            actions: tempTable
        }

        await makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: newState,
            modifier: state => {
                state.tests = newState
            }
        })
    }

    const updateSuiteTitle = async () => {
        if (isModified){
            await makeRequest({
                path: `/projects/${projectId}/suites/${testSuiteId}/`,
                method: 'patch',
                data: {
                    name: suiteName
                },
                modifier: (state) => {
                    const projects = Array.from(apiState.projects)
                    const projectIndex = projects.findIndex(p => p.id === projectId)
                    const newValue = projects[projectIndex].test_suite_references.map(s => s.id === testSuiteId ? { ...s, name: suiteName } : s)

                    projects[projectIndex] = {
                        ...projects[projectIndex],
                        test_suite_references: newValue
                    }

                    state.projects = projects
                    state.tests.name = suiteName
                }
            })

            return setIsModified(false)
        }

        return setIsModified(true)
    }

    const runTestSuite = async () => {
        const cancel = confirm('Are you sure you want to run this suite ?')
        if (!cancel) return

        await makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/generate/`,
            method: 'put'
        })
    }

    return (
        <LoginGuard>
            {endpointModal ?
                <EndpointSelector data={apiState.endpoints} projectId={projectId} onClose={data => {
                    addNewTest(data)
                    setEndpointModal(false)
                }} />
            : null}

            <div className='w-full flex md:flex-row justify-between h-full flex-col'>
                <div className='w-full md:w-[48%] flex flex-col'>
                    <div className='flex flex-col mb-16 mt-10'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <Link href={`/projects/${projectId}`}>
                                <a className='text-blue'>
                                    {'< Back'}
                                </a>
                            </Link>
                            <Button
                                size={'s'}
                                type={'warning'}
                                onClick={() => deleteSuite()}
                                className='text-red bg-white text-xs float-right'
                            >
                                {'delete suite'}
                            </Button>
                        </div>
                        <div className='w-full flex flex-row justify-between items-center mt-8'>
                            <div className='flex flex-row justify-start items-center'>
                                {isModified ?
                                    <div className='flex flex-row items-center justify-center'>
                                        <Input
                                            type="text"
                                            className=""
                                            placeholder="New name"
                                            value={suiteName}
                                            onChange={(e) => setSuiteName(e.target.value)}
                                        />
                                    </div>
                                :
                                    <h2 className='text-2xl font-sans w-9/12'>{`${(!apiState.isLoading && apiState.projects?.find(p => p.id === projectId)?.name) ? apiState.projects.find(p => p.id === projectId).name : 'Loading...'} > ${apiState.tests.name}`}</h2>
                                }
                                <Button
                                    size={'s'}
                                    type={'warning'}
                                    onClick={() => updateSuiteTitle()}
                                    className='text-blue bg-white text-xs opacity-40'
                                >
                                    <Image width={'20px'} height={'20px'} className='' src={PictoIllustration} alt={'update name'} />
                                </Button>
                            </div>
                            <Button
                                size={'s'}
                                type={'white'}
                                className={'whitespace-nowrap'}
                                onClick={() => runTestSuite()}
                            >
                                Run test suite
                            </Button>
                        </div>
                        {execStatus ? 
                            <p className='mt-12 text-lg'>Status: {execStatus}</p> 
                            : <></>
                        }
                    </div>
                    {apiState.tests?.actions?.length ? apiState.tests.actions.map((test, index) => (

                        <TestItem
                            key={index}
                            name={test.description}
                            method={test.request.method}
                            onClick={() => setCurrentTest(test)}
                            moveUp={() => moveUp(index)}
                            moveDown={() => moveDown(index)}
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
                <div className='md:w-1/2 w-full mt-4 md:mt-0'>
                    <TestEditor
                        selected={currentTest}
                        projectId={projectId}
                        testSuiteId={testSuiteId}
                    />
                </div>
            </div>
            <Footer className='bottom-auto'/>
        </LoginGuard>
    )
}