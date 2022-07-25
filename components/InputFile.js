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
        <div className={['flex flex-col justify-start items-start', className].join(' ')}>
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
                    type={'file'}
                    name={name}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={[
                        'focus:ring-indigo-500 w-full focus-visible:ring-indigo-500 border-2 focus:border-indigo-500 focus-visible:border-indigo-500 block px-4 py-3 sm:text-sm border-gray-300 rounded-md appearance-none',
                        error ? 'border-red-500' : '',
                    ].join(' ')}
                />
            </div>
        </div>
    )
}