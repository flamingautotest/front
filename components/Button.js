import { joinClassNames } from '~/utils'

export default function Button(props) {
    const {
        type = 'primary',
        size = 's',
        fullWidth = false,
        className = '',
        children,
        onClick = () => {},
        disabled = false,
    } = props

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={
                joinClassNames(
                    'font-medium ease-in-out duration-200 select-none rounded-full',
                    disabled && 'bg-red-50 hover:bg-red-50 hover:shadow-none text-slate-300',
                    type === 'primary' ? 'bg-pink hover:bg-rose-300 text-slate-600 hover:shadow-lg' : '',
                    type === 'secondary' ? 'bg-indigo-200 hover:bg-indigo-300 text-slate-600 hover:shadow-lg' : '',
                    type === 'white' ? 'text-black bg-white border-gray-300 border' : '',
                    size === 'xs' ? 'p-2 text-xs' : '',
                    size === 's' ? 'py-2 px-4 text-sm' : '',
                    size === 'm' ? 'py-3 px-6 text-base' : '',
                    size === 'xl' ? 'py-4 px-5 text-xl' : '',
                    fullWidth ? 'w-full' : 'w-auto',
                    className,
                )
            }
        >
            {children}
        </button>
    )
}