import Link from 'next/link'
import { useRef } from 'react'
import joinClassNames from 'utils/joinClassNames'
import { Button } from '~/components'

export default function Modal(props) {
    const modalBox = useRef()

    const {
        title = 'New test suite',
        content = 'TODO: add new testsuite name and domain and other params inputs',
        onClose = () => {},
        className = '',
    } = props

    const handleClose = (e) => {
        const { left, right, top, bottom } = modalBox.current.getBoundingClientRect()
        if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) onClose()
    }

    return (
        <div
            style={{ background: 'rgba(0, 0, 0, 0.4)' }}
            onClick={handleClose}
            className={joinClassNames(
                'absolute z-10 w-full h-full flex flex-col items-center justify-center top-0 left-0',
                className
            )}
        >
            <div
                ref={modalBox}
                className='relative z-20 max-w-3xl w-full bg-white rounded-xl shadow-2xl px-2'
            >
                <header className='my-6 px-8'>
                    <p className='text-3xl font-medium'>{title}</p>
                </header>
                <hr></hr>
                <div className='my-6 px-8'>
                    <p>{content}</p>
                </div>
                    <hr></hr>
                <footer className='my-6 px-8 text-end'>
                    <Button
                        className={'mr-4'}
                        type={'secondary'}
                        size={'m'}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type={'primary'}
                        size={'m'}
                        onClick={onClose}
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </div>
    )
}