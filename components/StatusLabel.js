import { joinClassNames } from '~/utils'

export default function MethodLabel(props) {
    const { type, className } = props

    const getColor = () => {
        switch (type.toLowerCase()) {
            case 'success':
                return 'text-green border-green'
            case 'loading':
                return 'text-yellow border-yellow'
            case 'failed':
                return 'text-red border-red'
            default:
                return 'text-gray-600 border-gray-600'
        }
    }

    const color = getColor()

    return (
        <div className={joinClassNames(`px-2 w-fit border-2 ${color} rounded`, className)}>
            {`Status: ${type}`}
        </div>
    )
}