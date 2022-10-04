export default function TestItem(props) {
    const { method, name, onClick } = props

    return (
        <div
            onClick={onClick}
            className='w-full mb-1 bg-gray-300 cursor-pointer select-none'
        >
            <span>{method}</span>
            <h2 className=''>{name}</h2>
        </div>
    )
}