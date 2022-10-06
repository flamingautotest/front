import { useContext, useState } from 'react'
import { UserContext } from '~/stores'
import { InputFile, Button, LoginGuard } from '~/components'

export default function Upload() {
    const [file, setFile] = useState({})
    const { userState } = useContext(UserContext)

    return (
        <LoginGuard>
            <form className='flex flex-col pt-28 items-center justify-center w-60 mx-auto'>
                <h1 className='text-xl mb-10'>Hello {userState.firstName} {userState.lastName} !</h1>
                <InputFile
                    label={'To begin, first upload your swagger file'}
                    name={'upload'}
                    required={true}
                    className={'w-full mt-5'}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                    className={'mt-8'}
                    type={'primary'}
                    size={'m'}
                    disabled={file.name ? false : true}
                >
                    {'Next step'}
                </Button>
            </form>
        </LoginGuard>
    )
}