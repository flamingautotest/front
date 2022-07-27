import { useState } from 'react'
import { Button, Modal } from '~/components'

export default function CreateTest() {
    const [showModal, setShowModal] = useState(false)

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
                    {'+'}
                </Button>
            </div>
            {showModal ?
                <Modal
                    close={closeModal}
                />
            : null}
        </div>
    )
}