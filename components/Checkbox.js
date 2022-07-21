import checkIcon from '~/assets/check.svg'

export default function Checkbox(props) {
    const {
        label = '',
        content = '',
        onChange = () => {},
        className = '',
        reverse = false,
        twoLine = false,
        checked = false,
    } = props

    return (
        <div
            className={[
                'relative text-left cursor-pointer flex select-none',
                reverse ? 'flex-row-reverse' : 'flex-row',
                twoLine ? 'items-start' : 'items-center',
            ].join(' ')}
            onClick={() => onChange(!checked)}
        >
            <input
                type='checkbox'
                className='w-0 h-0 absolute opacity-0'
                defaultChecked={checked}
            />
            <div className={[
                'relative w-4 h-4 flex items-center justify-center rounded-[4px]',
                twoLine ? 'mt-1' : '',
                checked ? 'bg-indigo-500' : 'bg-transparent border border-gray-400',
            ].join(' ')}>
                <div className='w-full h-full flex items-center justify-center'>
                    <img src={checkIcon.src} className='w-2 h-2' />
                </div>
            </div>
            <div
                className={[
                    'flex',
                    twoLine ? 'flex-col' : 'flex-row',
                    reverse ? 'pr-2' : 'pl-2',
                    className,
                ].join(' ')}
            >
                {label.length ? <span className='font-medium mr-1 text-gray-900'>{label}</span> : null}
                {content.length ? <span className='font-regular text-gray-700'>{content}</span> : null}
            </div>
        </div>
    )
}