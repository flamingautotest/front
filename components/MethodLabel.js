export default function MethodLabel(props) {
    const { type } = props

    const getColor = () => {
        switch (type.toLowerCase()) {
            case 'get':
                return 'border-green'
            case 'post':
                return 'border-yellow'
            case 'put':
                return 'border-blue'
            case 'delete':
                return 'border-red'
            case 'patch':
                return 'border-gray-600'
            default:
                return 'border-gray-600'
        }
    }

    const color = getColor()

    return (
        <div className={`px-2 w-fit border-2 ${color} rounded`}>
            {type}
        </div>
    )
}