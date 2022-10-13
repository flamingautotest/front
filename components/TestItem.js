import { MethodLabel } from '~/components'

export default function TestItem(props) {
    const { method, name, onClick} = props

    return (
        <div
            onClick={onClick}
            className='w-full mb-1 bg-gray-100 flex p-4 flex-row cursor-pointer select-none'
        >
            <div className='w-20'>
                <MethodLabel type={method} />
            </div>
            <p className='ml-6'>{name}</p>
        </div>
    )
}