import { CheckIcon } from '@heroicons/react/solid'
import { joinClassNames } from '~/utils'

export default function Checkbox(props) {
    const {
        label = '',
        content = '',
        onChange = () => {},
        className = '',
        reverse = false,
        twoLines = false,
        checked = false,
    } = props

    return (
        <div
            className={joinClassNames(
                'relative text-left cursor-pointer flex select-none',
                reverse ? 'flex-row-reverse' : 'flex-row',
                twoLines ? 'items-start' : 'items-center',
            )}
            onClick={() => onChange(!checked)}
        >
            <input
                type='checkbox'
                className='w-0 h-0 absolute opacity-0'
                defaultChecked={checked}
            />
            <div className={joinClassNames(
                'relative w-4 h-4 flex items-center justify-center rounded-[4px]',
                twoLines ? 'mt-1' : '',
                checked ? 'bg-indigo-500' : 'bg-transparent border border-gray-400',
            )}>
                <div className='w-full h-full flex items-center justify-center'>
                    {checked ? <CheckIcon className='w-3 h-3' color='white' /> : null}
                </div>
            </div>
            <div
                className={joinClassNames(
                    'flex',
                    twoLines ? 'flex-col' : 'flex-row',
                    reverse ? 'pr-2' : 'pl-2',
                    className,
                )}
            >
                {label.length ? <span className='font-medium mr-1 text-gray-900'>{label}</span> : null}
                {content.length ? <span className='font-regular text-gray-700'>{content}</span> : null}
            </div>
        </div>
    )
}