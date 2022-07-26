import { useContext, useState } from 'react'
import { UserContext } from '~/stores'
import { InputFile } from '~/components'

export default function Upload() {
    const [file, setFile] = useState({})
    const [userState] = useContext(UserContext)

    return (
        <>
            <p>Hello {userState.email} !</p>
            <form className='flex flex-col pt-28 items-center justify-center w-60 mx-auto'>
                <InputFile
                    label={'Upload File'}
                    name={'upload'}
                    required={true}
                    className={'w-full mt-5'}
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </form>
        </>
    )
    
}