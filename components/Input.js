import { useEffect, useRef } from 'react'
import { joinClassNames } from '~/utils'

export default function Input(props) {
    const inputRef = useRef()
    const {
        type = 'text',
        label = '',
        name = '',
        value = '',
        onChange = () => {},
        placeholder = '',
        required = false,
        disabled = false,
        className = '',
        error = false,
        autoComplete = 'off',
        instaFocus = false,
    } = props

    useEffect(() => {
        if (instaFocus) {
            inputRef.current.focus()
        }
    }, [instaFocus])
    
    return (
        <div className={joinClassNames('flex flex-col justify-start items-start', className)}>
            {
                label.length ?
                    <label
                        htmlFor={name}
                        className='block text-sm font-medium text-gray-700'
                    >
                        {label}
                    </label>
                :
                    null
            }
            <div className='mt-1 relative rounded-md shadow-sm w-full'>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    ref={inputRef}
                    className={joinClassNames(
                        'focus:ring-indigo-500 w-full focus-visible:ring-indigo-500 border-2 focus:border-indigo-500 focus-visible:border-indigo-500 block px-4 py-3 sm:text-sm border-gray-300 rounded-md appearance-none',
                        error ? 'border-red-500' : '',
                    )}
                />
            </div>
        </div>
    )
}