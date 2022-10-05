import { useState } from 'react'
import { Modal, Footer } from '~/components'
import Link from 'next/link'

export default function CreateTest() {
    const [showModal, setShowModal] = useState(false)

    const projects = [{
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
    },]

    const closeModal = () => setShowModal(false)

    const onClick = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <div className='w-full mt-10'>
            <div className='flex mb-16'>
                <div>
                    <h2 className='text-3xl  font-sans'>TestSuite</h2>
                </div>
            </div>
            {showModal ?
                <Modal onClose={closeModal} />
            : null}
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
                {projects.map(project => (
                <Link key={project.id} href={`project/${project.id}`}>                
                  <tr className='h-16 border-gray-200 border-b text-gray-600' >
                    <td>{project.name}</td>
                    <td>{project.creation_date}</td>
                    <td>{project.frequency}</td>
                    <td className='flex items-center m-top mt-4'><p className='border-gray-200 border text-xs p-0.5 mr-1.5 rounded'>{project.last_execution.status}</p> {project.last_execution.date}</td>
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