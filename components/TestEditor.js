export default function TestEditor(props) {
    return (
        <div className='w-full bg-gray-300'>
            <h2 className=''>Test editor</h2>
            {!props.selected?.id ? (
                <div className='w-full bg-gray-300'>No test selected</div>
            ) : (
                <h2 className=''>{`Selected test id: ${props.selected.id}`}</h2>
            )}
        </div>
    )
}