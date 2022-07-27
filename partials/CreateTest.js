import { useState } from 'react'
import Link from 'next/link'
import { Button, Modal } from '~/components'

export default function CreateTest() {
    const [showModal, setShowModal] = useState(false)

    const projects = [{
        id : '1',
        name : 'test1',
    }, {
        id: '2',
        name: 'test2',
    }]

    const closeModal = () => {
        setShowModal(false)
    }

    const onClick = (e) => {
        e.preventDefault();
        setShowModal(true)
    }


    return (
        <div className='w-full mt-10'>
            <h2 className='text-3xl mb-10'>Create your test</h2>
            <div className='text-center'>
                <Button
                    size={'xl'}
                    type={'white'}
                    onClick={onClick}
                >
                    {'Add your test'}
                </Button>
            </div>
            {showModal ?
                <Modal
                    close={closeModal}
                />
            : null}
            <div>
                <ul>
                    {projects.map((project, index) =>(
                        <li>
                            <Link href={'test/'+project.id}>
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