import { joinClassNames } from '~/utils'

export default function InputFile(props) {
    const {
        label = '',
        name = '',
        onChange = () => {},
        required = false,
        disabled = false,
        className = '',
        error = false,
    } = props

    return (
        <div className={joinClassNames('text-left flex flex-col justify-start items-start', className)}>
            {
                label.length ?
                    <label
                        htmlFor={name}
                        className='text-left block text-sm font-medium text-gray-700'
                    >
                        {label}
                    </label>
                :
                    null
            }
            <div className='mt-1 relative rounded-md shadow-sm w-full'>
                <input
                    type={'file'}
                    name={name}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={joinClassNames(
                        'focus:ring-indigo-500 focus-visible:ring-indigo-500 w-full border-2 focus:border-indigo-500 focus-visible:border-indigo-500 block px-4 py-3 sm:text-sm border-gray-300 rounded-md appearance-none',
                        error ? 'border-red-500' : '',
                    )}
                />
            </div>
        </div>
    )
}