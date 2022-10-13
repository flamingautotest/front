import { useEffect, useRef, useState } from 'react'
import joinClassNames from 'utils/joinClassNames'
import { Button, Input } from '~/components'

export default function NewSuiteModal(props) {
    const [testSuiteTitle, setTestSuiteTitle] = useState('')
    const [testSuiteUrl, setTestSuiteUrl] = useState('')
    const modalBox = useRef()

    const {
        onClose = () => {},
        className = '',
    } = props

    useEffect(() => {
        modalBox.current.addEventListener('keyup', e => {
            if (e.key === 'Escape') onClose({})
        })
    }, [onClose])

    const handleClose = (e) => {
        const { left, right, top, bottom } = modalBox.current.getBoundingClientRect()
        if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) return
        onClose({ name: testSuiteTitle, url: testSuiteUrl })
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
                    <p className='text-3xl font-medium'>New test suite</p>
                </header>
                
                <div className='my-6 px-8'>
                    <Input
                        label={'Test suite name'}
                        name={'name'}
                        type={'text'}
                        placeholder={'ie: preprod user test suite'}
                        required={true}
                        value={testSuiteTitle}
                        className={'w-full mt-5'}
                        onChange={(e) => setTestSuiteTitle(e.target.value)}
                        instaFocus={true}
                    />
                    <Input
                        label={'Endpoint URL'}
                        name={'url'}
                        type={'text'}
                        placeholder={'ie: https://api.example.com/'}
                        required={true}
                        value={testSuiteUrl}
                        className={'w-full mt-5'}
                        onChange={(e) => setTestSuiteUrl(e.target.value)}
                    />
                </div>
                
                <footer className='my-6 px-8 text-end'>
                    <Button
                        className={'mr-4'}
                        type={'secondary'}
                        size={'m'}
                        onClick={() => onClose({})}
                    >
                        Cancel
                    </Button>
                    <Button
                        type={'primary'}
                        size={'m'}
                        disabled={!testSuiteTitle.length > 0 || !testSuiteUrl.length > 0}
                        onClick={() => onClose({ name: testSuiteTitle, url: testSuiteUrl })}
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </div>
    )
}