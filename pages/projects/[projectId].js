import { Footer } from '~/components'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ProjectDetail() {
    const router = useRouter()
    // TODO: use to load test suites
    const { projectId } = router.query

    const testSuites = [{
        id : '1',
        name : 'test1',
        creation_date : 'dateString',
        frequency: '15 minutes',
        last_execution : {
            status: 'success',
            date: 'datestring'
        }
    }, {
        id : '2',
        name : 'test2',
        creation_date : 'dateString',
        frequency: '15 minutes',
        last_execution : {
            status: 'failure',
            date: 'datestring'
        }
    },{
        id : '3',
        name : 'test3',
        creation_date : 'dateString',
        frequency: '15 minutes',
        last_execution : {
            status: 'failure',
            date: 'datestring'
        }
    },{
        id : '4',
        name : 'test4',
        creation_date : 'dateString',
        frequency: '4 minutes',
        last_execution : {
            status: 'warning',
            date: 'datestring'
        }
    }]

    return (
        <div className='w-full mt-10'>
            <div className='flex mb-16'>
                <div>
                    <Link href='/projects'>
                        <a className='text-blue-500'>
                            {'< Back'}
                        </a>
                    </Link>
                    <h2 className='text-3xl  font-sans'>Test suites</h2>
                </div>
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
                    <th className='text-left'>Name</th>
                    <th className='text-left'>Creation date</th>
                    <th className='text-left'>frequency</th>
                    <th className='text-left'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {testSuites.map(testSuite => (
                        <Link key={testSuite.id} href={`/suite/${testSuite.id}`}>                
                            <tr className='h-16 cursor-pointer border-gray-200 border-b text-gray-600' >
                                <td>{testSuite.name}</td>
                                <td>{testSuite.creation_date}</td>
                                <td>{testSuite.frequency}</td>
                                <td className='flex items-center m-top mt-4'><p className='border-gray-200 border text-xs p-0.5 mr-1.5 rounded'>{testSuite.last_execution.status}</p> {testSuite.last_execution.date}</td>
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
    )
}