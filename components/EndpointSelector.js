import { useEffect, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import joinClassNames from 'utils/joinClassNames'
import { Button, Input } from '~/components'

export default function EndpointSelector(props) {
    const [inputValue, setInputValue] = useState('')
    const [selectedEndpoint, setSelectedEndpoint] = useState({})
    const [showResults, setshowResults] = useState(false)
    const [filteredEndpoints, setFilteredEndpoints] = useState([])
    const [inputHeight, setInputHeight] = useState(0)
    const modalBox = useRef()
    const resultBox = useRef()
    const inputBox = useRef()
    const { onClose = () => {}, data = [], className = '' } = props

    useEffect(() => {
        setInputHeight(inputBox.current.offsetHeight)
    }, [inputBox.current])

    useEffect(() => {
        modalBox.current.addEventListener('keyup', e => {
            if (e.key === 'Escape') onClose({})
        })
    }, [])


    const fuse = new Fuse(data, {
        keys: [
            'description',
            'request.path',
        ],
    })

    const handleClose = e => {
        const modalCoords = modalBox.current.getBoundingClientRect()
        const resultCoords = resultBox.current.getBoundingClientRect()
        if (e.clientX > modalCoords.left && e.clientX < modalCoords.right && e.clientY > modalCoords.top && e.clientY < modalCoords.bottom) return
        if (e.clientX > resultCoords.left && e.clientX < resultCoords.right && e.clientY > resultCoords.top && e.clientY < resultCoords.bottom) return
        onClose(selectedEndpoint)
    }

    const handleInput = value => {
        setSelectedEndpoint({})
        setInputValue(value)
        const result = fuse.search(value).sort((p1, p2) => p1.refIndex > p2.refIndex)
        console.log(result)
        setFilteredEndpoints(result)
        setshowResults(true)
    }

    const handleSelect = endpoint => {
        handleInput(endpoint.request.path)
        setSelectedEndpoint(endpoint)
        setshowResults(false)
    }

    return (
        <div
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={handleClose}
            className={joinClassNames(
                'absolute z-10 w-full h-full flex flex-col items-center justify-start top-0 left-0',
                className
            )}
        >
            <div
                ref={modalBox}
                className='relative z-20 max-w-3xl w-full px-2 flex flex-row items-end mt-[15vh]'
            >
                <div ref={inputBox} className='relative w-full'>
                    <p className='text-xl mb-10 text-white w-full text-center'>Which endpoint do you wish to test ?</p>
                    <Input
                        name={'search'}
                        type={'text'}
                        placeholder={'ie: type /api/v1/users/{userId} or Get users'}
                        value={inputValue}
                        className={'w-full mt-5'}
                        onChange={(e) => handleInput(e.target.value)}
                        instaFocus={true}
                    />
                    <div ref={resultBox} style={{ top: `calc(${inputHeight}px - 1.25rem)` }} className='absolute w-full h-[50vh] left-0 overflow-auto'>
                        {showResults && filteredEndpoints.map(({ item }, index) => (
                            <div
                                key={index}
                                className='flex flex-row bg-white items-center justify-between px-4 py-2 border-b border-gray-200 w-full cursor-pointer hover:bg-gray-100'
                                onClick={() => handleSelect(item)}
                            >
                                <div className='flex flex-col'>
                                    <div className='text-sm font-medium text-gray-900'>{item.request.method}</div>
                                    <div className='text-sm text-gray-500'>{item.request.path}</div>
                                    <div className='text-sm text-gray-500'>{item.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <footer className='mt-6 px-8 text-center'>
                    <Button
                        type={'primary'}
                        size={'m'}
                        disabled={selectedEndpoint.request?.path === undefined}
                        onClick={() => onClose(selectedEndpoint)}
                    >
                        Select
                    </Button>
                </footer>
            </div>
        </div>
    )
}