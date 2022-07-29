import Link from 'next/link'
import joinClassNames from 'utils/joinClassNames'
import { Button } from '~/components'

export default function Modal(props) {
    const {
        title = 'Test',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
        onClose = () => {},
    } = props

    return (
        <div className={
            joinClassNames(
                'absolute z-10 bg-white flex flex-col rounded-xl shadow-2xl px-2 max-w-3xl top-1/4 left-1/4',
            )
        }>
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
    )
}