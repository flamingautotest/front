import { joinClassNames } from '~/utils'

export default function Notification(props) {
    const {
        className = '',
        text = '',
        isError = false,
    } = props

    if (!text.length) return null

    return (
        <div className={joinClassNames(
            'w-full p-5 text-base text-white rounded-md',
            isError ? 'bg-red' : 'bg-green',
            className,
        )}>
            {text}
        </div>
    )
}