import { TestItem, TestEditor, Footer, LoginGuard, Button, EndpointSelector } from '~/components'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { UserContext, APIContext } from '~/stores'
import { useMockData } from '~/hooks'

export default function TestSuite() {
    const router = useRouter()
    const { projectId, testSuiteId } = router.query
    const { getMockData } = useMockData()
    const { userState } = useContext(UserContext)
    const { apiState, makeRequest } = useContext(APIContext)
    const [currentTest, setCurrentTest] = useState(null)
    const [endpointModal, setEndpointModal] = useState(false)

    useEffect(() => {
        if (userState.isLoggedIn && projectId) {
            const call = async () => {
                const testsMock = await getMockData('tests')
                const endpointsMock = await getMockData('endpoints')
                await makeRequest({
                    path: `/projects/${projectId}/test-suites/${testSuiteId}`,
                    modifier: state => {
                        // TODO: replace with response from API
                        state.tests = testsMock
                        state.endpoints = endpointsMock
                    }
                })
            }
            call()
        }
    }, [userState])

    const addNewMockTest = (data) => {
        console.log("state", apiState.tests)
        console.log("data", data)

        makeRequest({
            path: `/projects/${projectId}/test-suites/${testSuiteId}/tests`,
            method: 'POST',
            data: data,
            modifier: state => {
                // TODO: replace with response from API
                state.tests.testActions = [...apiState.tests.testActions, data]
            }
        })
    }

    return (
        <LoginGuard>
            {endpointModal ?
                <EndpointSelector data={apiState.endpoints} onClose={data => {
                    addNewMockTest(data)
                    setEndpointModal(false)
                }} />
            : null}

            <div className='w-full flex flex-row justify-between'>
                <div className='w-1/2 flex flex-col'>
                    <div className='flex mb-16 mt-10'>
                        <div>
                            <Link href={`/projects/${projectId}`}>
                                <a className='text-blue'>
                                    {'< Back'}
                                </a>
                            </Link>
                            {/* TODO: make this dynamic */}
                            <h2 className='text-3xl  font-sans'>{`Project name > Test suite name`}</h2>
                        </div>
                    </div>
                    {apiState.tests?.testActions?.length && apiState.tests.testActions.map((test, index) => (
                        <TestItem
                            key={index}
                            name={test.description}
                            method={test.request.method}
                            onClick={() => setCurrentTest(test)}
                        />
                    ))}
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