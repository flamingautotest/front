import { useState } from 'react'
import { Button, Modal } from '~/components'
import Link from 'next/link'

export default function CreateTest() {
    const [showModal, setShowModal] = useState(false)

    const projects = [{
        id : '1',
        name : 'test1',
    }, {
        id: '2',
        name: 'test2',
    }]

    return (
        <div className='w-full mt-10'>
            <h2 className='text-3xl mb-10'>Create your test</h2>
            <div className='text-center'>
                <Button
                    size={'xl'}
                    type={'white'}
                    onClick={() => setShowModal(true)}
                >
                    {'Add your test'}
                </Button>
            </div>
            {showModal ?
                <Modal onClose={() => setShowModal(false)} />
            : null}
            <div>
                <ul>
                    {projects.map((project, index) =>(
                        <li key={index}>
                            <Link href={`/suite/${project.id}`}>
                                <a>
                                    {project.name}
                                </a>
                            </Link>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}