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
                    mock: false,
                    path: `/projects/${projectId}/suites/${testSuiteId}/`,
                    modifier: (state, response) => {
                        state.tests = response
                    }
                })
            }
            call()
        }
    }, [userState])

    const addNewMockTest = (data) => {
        if (Object.keys(data).length <= 0) return

        makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: [...apiState.tests.actions, data],
            modifier: state => {
                state.tests.actions = [...apiState.tests.actions, data]
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
                            <h2 className='text-3xl  font-sans'>{`${apiState.projects.find(p => p.id === projectId).title} > ${apiState.tests.title}`}</h2>
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