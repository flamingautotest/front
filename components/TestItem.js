import { MethodLabel } from '~/components'

export default function TestItem(props) {
    const { method, name, onClick, moveUp, moveDown} = props

    return (
        <div
            className='w-full mb-1 bg-gray-100 flex p-4 flex-row cursor-pointer select-none'
        >   
            <div className='mr-4'>
                <p onClick={moveUp}>↑</p>
                <p onClick={moveDown}>↓</p>
            </div>
            <div onClick={onClick} className='flex items-center'>
                <div 
                    onClick={onClick}
                    className='w-20'
                >
                    <MethodLabel type={method} />
                </div>
                <p className='ml-6'>{name}</p>
            </div>
        </div>
    )
}