import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Input, Button, Notification, Footer } from '~/components'
import { UserContext } from '~/stores'
import { Requests, jwt } from '~/utils'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()
    const { userState, loginUser } = useContext(UserContext)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // TODO: add API call and loggin logic + verification
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        if (email.length === 0 || password.length === 0) {
            setError('Please fill in all fields')
            return
        }
        
        try {
            jwt.removeJWT()
            const req = new Requests()

            const res = await req.post('/users/login/', {
                email: email,
                password: password
            })

            if (res.data?.data?.length) {
                jwt.setJWT(res.data.data)
                loginUser()
            } else {
                setError('Email or password is incorrect')
            }
        } catch (err) {
            setError('Network error. Try again later.')
            console.log(err)
        }
    }

    useEffect(() => {
        if (userState.isLoggedIn) router.push('/')
    }, [userState, router])

    // TODO: add errors, loading, etc.
    return (
        <div>
            <form className='flex flex-col pt-28 items-center justify-center w-60 mx-auto'>
                <h1 className='text-xl w-full text-center font-bold mb-4'>Login to AutoTest</h1>
                <Notification
                    text={error}
                    isError
                />
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
                            {'Don\'t have an account ?'}
                        </Button>
                    </a>
                </Link>
            </form>
            <Footer className={'bottom-0'} />
        </div>
    )
}