import { TestItem, TestEditor } from '~/components'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function TestSuite() {
    const [currentTest, setCurrentTest] = useState(null)
    const router = useRouter()
    const { testId } = router.query

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

    return (
        <div className='w-full flex flex-row justify-between'>
            <div className='w-1/2 flex flex-col'>
                {mockTestList.map(test => (
                    <TestItem
                        key={test.id}
                        name={test.name}
                        method={test.method}
                        onClick={() => setCurrentTest(test)}
                    />
                ))}
            </div>
            <div className='w-1/2'>
                <TestEditor selected={currentTest} />
            </div>
        </div>
    )
}