import { TestItem, TestEditor, Footer, LoginGuard, Button } from '~/components'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

// TODO: fetch testsuite data from API using testId instead of this
const mockTestList = [
    {
        id: 1,
        name: 'Test 1',
        description: 'This is a test',
        method: 'POST',
    },
    {   
        id: 2,
        name: 'Test 2',
        description: 'This is a test',
        method: 'GET',
    },
]

export default function TestSuite() {
    const [tests, setTests] = useState(mockTestList)
    const [currentTest, setCurrentTest] = useState(null)
    const router = useRouter()
    const { projectId, testId } = router.query

    const addNewMockTest = () => {
        const newMockTest = {
            id: tests.length + 1,
            name: 'New Test',
            description: 'This is a new test',
            method: 'DELETE',
        }
        setTests([...tests, newMockTest])
        setCurrentTest(newMockTest)
    }

    return (
        <LoginGuard>
            <div className='w-full flex flex-row justify-between'>
                <div className='w-1/2 flex flex-col'>
                    <div className='flex mb-16 mt-10'>
                        <div>
                            <Link href={`/projects/${projectId}`}>
                                <a className='text-blue-500'>
                                    {'< Back'}
                                </a>
                            </Link>
                            {/* TODO: make this dynamic */}
                            <h2 className='text-3xl  font-sans'>{`Project name > Test suite name`}</h2>
                        </div>
                    </div>
                    {tests.map(test => (
                        <TestItem
                            key={test.id}
                            name={test.name}
                            method={test.method}
                            onClick={() => setCurrentTest(test)}
                        />
                    ))}
                    <div className='w-full text-center mt-4'>
                        <Button
                            size={'xl'}
                            type={'white'}
                            onClick={() => addNewMockTest()}
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