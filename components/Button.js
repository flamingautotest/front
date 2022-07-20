export default function Button(props) {
    const {
        type = 'primary',
        size = 'm',
        rounded = false,
        fullWidth = false,
    } = props

    return (
        <button className={
            [
                'font-medium ease-in-out duration-200 select-none',
                type === 'primary' && 'bg-indigo-500 hover:bg-indigo-700 text-white',
                type === 'secondary' && 'bg-indigo-200 hover:bg-indigo-300 text-violet-800',
                type === 'white' && 'text-black bg-white border-gray-300 border',
                size === 'xs' && 'p-2 text-xs',
                size === 's' && 'p-3 text-sm',
                size === 'm' && 'py-3 px-4 text-base',
                size === 'xl' && 'py-4 px-5 text-xl',
                rounded ? 'rounded-full' : 'rounded-md',
                fullWidth ? 'w-full' : 'w-auto',
            ].join(' ')
        }>
            {props.children}
        </button>
    )
}