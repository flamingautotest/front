import { useContext, useEffect, useState } from 'react'
import { useTitleSize } from '~/hooks'
import { joinClassNames } from '~/utils'
import { MethodLabel, Input, Button } from '~/components'
import { APIContext } from '~/stores'

export default function TestEditor(props) {
    const { selected, projectId, testSuiteId } = props
    const { apiState, makeRequest } = useContext(APIContext)
    const [editedTest, setEditedTest] = useState(selected)
    const [hasEdited, setHasEdited] = useState(false)
    const [jsonFormatError, setJsonFormatError] = useState(false)
    const textSize = useTitleSize(selected?.request?.path)

    useEffect(() => {
        setEditedTest(selected)
        setHasEdited(false)
    }, [selected])

    const handleJsonChange = (data) => {
        try {
            setJsonFormatError(false)
            const json = JSON.parse(data.replace('\n', ''))
            setEditedTest({
                ...editedTest,
                expected_response: {
                    ...editedTest.expected_response,
                    json: json
                }
            })
            setHasEdited(true)
        } catch (e) {
            console.error(e)
            setJsonFormatError(true)
        }
    }

    const handleRequestEdit = (data, index) => {
        const newParams = Array.from(editedTest.request.parameters)
        const newValue = { ...newParams[index], value: data }
        newParams[index] = newValue
        setEditedTest({ ...editedTest, request: { ...editedTest.request, parameters: newParams } })
        setHasEdited(true)
    }

    const saveEdited = async () => {
        if (selected === null) return

        const newState = {
            ...apiState.tests,
            actions: [...apiState.tests.actions.map(a => a.id === selected.id ? editedTest : a)]
        }

        await makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: newState,
            modifier: state => {
                state.tests = newState
            }
        })

        setHasEdited(false)
    }

    const deleteTest = async () => {
        const cancel = confirm('Are you sure you want to delete this test?')
        if (!cancel) return

        if (selected === null) return

        const newState = {
            ...apiState.tests,
            actions: [...apiState.tests.actions.filter(a => a.id !== selected.id)]
        }

        await makeRequest({
            path: `/projects/${projectId}/suites/${testSuiteId}/`,
            method: 'patch',
            data: newState,
            modifier: state => {
                state.tests = newState
            }
        })

        setEditedTest(null)
    }

    return (
        <div className='w-full bg-gray-100 relative h-full'>
            {editedTest === null ? (
                <div className='w-full h-full flex flex-col items-center justify-center text-2xl'>No test selected</div>
            ) : (
                <div className='w-full h-full py-5 px-7 md:py-10 md:px-12 flex flex-col'>
                    <p className='text-xl mb-4 font-bold'>{editedTest.description}</p>
                    <div className='flex flex-row w-full justify-start items-center mb-8'>
                        <MethodLabel
                            type={editedTest.request.method}
                            className='mr-4'
                        />
                        <p className={joinClassNames('font-medium', textSize)}>{editedTest.request.path}</p>
                    </div>
                    {(editedTest !== null && editedTest.request.parameters?.length) ? (
                        <>
                            <p className='text-xl font-bold my-6 text-black'>Request</p>
                            {editedTest.request.parameters.map((test, index) => (
                                <div key={index} className='flex flex-row'>
                                    <div className='flex flex-col py-4 border-b-gray-200 border-b w-full'>
                                        <p className='text-black'>{test.name}<span className='text-gray-500'>: {test.type}</span></p>
                                        <Input
                                            name={test.name}
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
                    {(editedTest !== null && editedTest?.expected_response) ? (
                        <>
                            <p className='text-xl font-bold text-black my-6'>Response</p>
                            <p className='text-black'>Status: <Input type={'text'} placeholder={editedTest.expected_response.status_code}/></p>
                            {editedTest.expected_response.json ? (
                                <div className='w-full mt-2'>
                                    {jsonFormatError ? <p className='text-red'>JSON syntax error. Please check your syntax.</p> : null}
                                    <textarea
                                        // contentEditable={true}
                                        // dangerouslySetInnerHTML={{ __html: syntaxHighlight(editedTest.expected_response.json, null, "\t") }}
                                        className={joinClassNames('w-full min-h-[400px] p-4 border', jsonFormatError ? 'border-red' : 'border-gray-300')}
                                        onChange={e => handleJsonChange(e.target.value)}
                                        autoComplete='off'
                                        autoCorrect='off'
                                        autoCapitalize='off'
                                        wrap='off'
                                        spellCheck='false'
                                        cols={30}
                                        value={JSON.stringify(editedTest.expected_response.json, null, '\t')}
                                    >
                                        {JSON.stringify(editedTest.expected_response.json, undefined, "\t")}
                                    </textarea>
                                </div>
                            ) : null}
                        </>
                    ) : null}
                    <div className='w-full pt-6 bottom-0 left-0 flex flex-row sm:justify-center md:justify-end items-center'>
                        <Button
                            type='secondary'
                            className='mr-4'
                            onClick={() => deleteTest()}
                        >
                            Delete
                        </Button>
                        <Button
                            type='primary'
                            className='mr-4'
                            onClick={() => saveEdited()}
                            disabled={!hasEdited}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}