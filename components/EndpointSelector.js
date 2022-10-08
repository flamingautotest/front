import { useRef, useState } from 'react'
import joinClassNames from 'utils/joinClassNames'
import { Button } from '~/components'

export default function EndpointSelector(props) {
    const [selectedEndpoint, setSelectedEndpoint] = useState({})
    const modalBox = useRef()

    const {
        onClose = () => {},
        className = '',
    } = props

    const handleClose = (e) => {
        const { left, right, top, bottom } = modalBox.current.getBoundingClientRect()
        if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) onClose(selectedEndpoint)
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
                <footer className='my-6 px-8 text-end'>
                    <Button
                        className={'mr-4'}
                        type={'secondary'}
                        size={'m'}
                        onClick={() => onClose(selectedEndpoint)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type={'primary'}
                        size={'m'}
                        onClick={() => onClose(selectedEndpoint)}
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </div>
    )
}