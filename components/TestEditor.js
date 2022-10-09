import { useEffect, useState } from 'react'
import { useTitleSize } from '~/hooks'
import { joinClassNames } from '~/utils'
import { MethodLabel, Input } from '~/components'

export default function TestEditor(props) {
    const { selected } = props
    const [editedTest, setEditedTest] = useState(selected)
    const textSize = useTitleSize(selected?.request?.path)

    useEffect(() => {
        setEditedTest(selected)
    }, [selected])

    const handleRequestEdit = (data, index) => {
        const newParams = Array.from(editedTest.request.parameters)
        const newValue = { ...newParams[index], value: data }
        newParams[index] = newValue
        setEditedTest({ ...editedTest, request: { ...editedTest.request, parameters: newParams } })
    }

    return (
        <div className='w-full h-[75vh] bg-gray-100'>
            {selected === null ? (
                <div className='w-full h-full flex flex-col items-center justify-center text-2xl'>No test selected</div>
            ) : (
                <div className='w-full h-full py-10 px-16 flex flex-col'>
                    <div className='flex flex-row w-full justify-start items-center mb-8'>
                        <MethodLabel
                            type={selected.request.method}
                            className='mr-4'
                        />
                        <p className={joinClassNames('font-medium', textSize)}>{selected.request.path}</p>
                    </div>
                    {(editedTest !== null && editedTest.request.parameters?.length) ? (
                        <>
                            <p className='text-2xl font-bold mb-6 text-black mt-2'>Request</p>
                            {editedTest.request.parameters.map((test, index) => (
                                <div key={index} className='flex flex-row'>
                                    <div className='flex flex-col my-2 py-4 border-b-gray-200 border-b w-full'>
                                        <p className='text-black'>{test.title}<span className='text-gray-500'>: {test.type}</span></p>
                                        <Input
                                            name={test.title}
                                            type={'text'}
                                            placeholder={test.description}
                                            value={test.value}
                                            className={'w-full mt-2'}
                                            onChange={(e) => handleRequestEdit(e.target.value, index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : null}
                </div>
            )}
        </div>
    )
}