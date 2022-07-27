import { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '~/stores'
import { InputFile, Button } from '~/components'

export default function Upload() {
    const [file, setFile] = useState({})
    const [userState] = useContext(UserContext)

    return (
        <>
            <p>Hello {userState.email} !</p>
            <form className='flex flex-col pt-28 items-center justify-center w-60 mx-auto'>
                <InputFile
                    label={'Choose the test to upload'}
                    name={'upload'}
                    required={true}
                    className={'w-full mt-5'}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Link href='/create-test'>
                    <a>
                        <Button
                            className={'mt-4'}
                            type={'primary'}
                            size={'m'}
                            disabled={file.name?false:true}
                        >
                            {'Next step'}
                        </Button>
                    </a>
                </Link>
            </form>
        </>
    )
}