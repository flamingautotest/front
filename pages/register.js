import { useState } from 'react'
import Link from 'next/link'
import { Input, Button } from '~/components'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit register. replace with register function')
        console.log(email, password)
    }
    // TODO: add errors, loading, etc.
    return (
        <form className='flex flex-col pt-28 items-center justify-center w-60 mx-auto'>
            <h1 className='text-xl w-full text-center font-bold mb-4'>Register to AutoTest</h1>
            <Input
                label={'Email'}
                name={'email'}
                type={'email'}
                placeholder={'Email'}
                required={true}
                value={email}
                className={'w-full mt-5'}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                label={'Password'}
                name={'password'}
                type={'password'}
                placeholder={'Password'}
                required={true}
                value={password}
                className={'w-full mt-2'}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                label={'Repeat password'}
                name={'repeat_password'}
                type={'password'}
                placeholder={'Repeat password'}
                required={true}
                value={repeatPassword}
                className={'w-full mt-2'}
                onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
                className={'mt-5'}
                onClick={handleSubmit}
                fullWidth
            >
                Create account
            </Button>
            <Link href='/login'>
                <a className='w-full'>
                    <Button
                        className={'mt-2'}
                        type={'secondary'}
                        fullWidth
                    >
                        Already have an account ?
                    </Button>
                </a>
            </Link>
        </form>
    )
}