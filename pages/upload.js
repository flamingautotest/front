import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { UserContext,APIContext } from '~/stores'
import { InputFile, Button, LoginGuard, Input } from '~/components'

export default function Upload() {
    const { userState } = useContext(UserContext)
    const { makeRequest } = useContext(APIContext)
    const [projectName, setProjectName] = useState('')
    const [file, setFile] = useState({})

    const submitNewProject = async () => {
        const formData = new FormData()
        const encodedFile = window.btoa(file)
        formData.append('file', encodedFile)

        await makeRequest({
            method: 'post',
            path: '/projects/',
            data: {
                title : projectName,
                file : formData,
            }
        })
    }

    return (
        <LoginGuard>
            <form className='flex flex-col pt-28 items-center justify-center max-w-sm w-full text-center mx-auto'>
                <h1 className='text-xl mb-10'>Hello {userState.firstName} {userState.lastName} !</h1>
                <p className='text-xl my-10'>To begin, first give your project a name, specify its url and upload your swagger file</p>
                <Input
                    label={'Project name'}
                    name={'name'}
                    type={'text'}
                    placeholder={'API v1 preprod'}
                    required={true}
                    value={projectName}
                    className={'w-full mt-5'}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <InputFile
                    label={'To begin, first give your project a name and upload your swagger file'}
                    name={'upload'}
                    required={true}
                    className={'w-full mt-5'}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <div className='w-full mt-10 flex flex-row justify-center items-center'>
                    <Link href='/projects'>
                        <a>
                            <Button
                                className={'mt-8 mx-1'}
                                type={'white'}
                                size={'m'}
                            >
                                {'Cancel'}
                            </Button>
                        </a>
                    </Link>
                    <Button
                        className={'mt-8 mx-1'}
                        type={'primary'}
                        size={'m'}
                        onClick={(e) => {
                            e.preventDefault()
                            submitNewProject()
                        }}
                        disabled={(file.name && projectName.length > 0) ? false : true}
                    >
                        {'Next step'}
                    </Button>
                </div>
            </form>
        </LoginGuard>
    )
}