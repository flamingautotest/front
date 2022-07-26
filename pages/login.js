import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Input, Button } from '~/components'
import { UserContext } from '~/stores'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()
    const [userState, userDispatch] = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // TODO: add API call and loggin logic + verification
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0) return

        userDispatch(user => {
            user.email = email
            user.isLoggedIn = true
        })
    }

    useEffect(() => {
        if (userState.isLoggedIn) router.push('/')
    }, [userState])

    // TODO: add errors, loading, etc.
    return (
        <form className='flex flex-col pt-28 items-center justify-center w-60 mx-auto'>
            <h1 className='text-xl w-full text-center font-bold mb-4'>Login to AutoTest</h1>
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
            <Button
                className={'mt-5'}
                onClick={handleSubmit}
                fullWidth
            >
                Login
            </Button>
            <Link href='/register'>
                <a className='w-full'>
                    <Button
                        className={'mt-2'}
                        type={'secondary'}
                        fullWidth
                    >
                        Don't have an account ?
                    </Button>
                </a>
            </Link>
        </form>
    )
}