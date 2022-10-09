import { joinClassNames } from '~/utils'

export default function MethodLabel(props) {
    const { type, className } = props

    const getColor = () => {
        switch (type.toLowerCase()) {
            case 'get':
                return 'text-green border-green'
            case 'post':
                return 'text-yellow border-yellow'
            case 'put':
                return 'text-blue border-blue'
            case 'delete':
                return 'text-red border-red'
            case 'patch':
                return 'text-gray-600 border-gray-600'
            default:
                return 'text-gray-600 border-gray-600'
        }
    }

    const color = getColor()

    return (
        <div className={joinClassNames(`px-2 w-fit border-2 ${color} rounded`, className)}>
            {type}
        </div>
    )
}