import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UserContext } from '~/stores'
import { Input, Button, Notification, Footer } from '~/components'
import { Requests } from '~/utils'

export default function Register() {
    const router = useRouter()
    const { userState } = useContext(UserContext)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (password !== repeatPassword) {
            setError('Passwords do not match')
            return
        }

        const req = new Requests()

        try {
            await req.post('/users/register', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })

            setSuccess('Successfully registered')
        } catch (err) {
            setError('Network error. Please try again later.')
            console.error('[pages/register/handleSubmit]', err)
        }
    }

    useEffect(() => {
        if (userState.isLoggedIn) router.push('/')
    }, [userState, router])

    return (
        <div>
            <form className='flex flex-col pt-11 items-center justify-center w-60 mx-auto'>
                <h1 className='text-xl w-full text-center font-bold mb-4'>Register to AutoTest</h1>
                <Notification
                    text={error}
                    isError
                />
                <Notification
                    text={success}
                />
                <Input
                    label={'First name'}
                    name={'first name'}
                    type={'text'}
                    placeholder={'First name'}
                    required={true}
                    value={firstName}
                    className={'w-full mt-5'}
                    onChange={(e) => setfirstName(e.target.value)}
                />
                <Input
                    label={'Last name'}
                    name={'last name'}
                    type={'text'}
                    placeholder={'Last name'}
                    required={true}
                    value={lastName}
                    className={'w-full mt-2'}
                    onChange={(e) => setlastName(e.target.value)}
                />
                <Input
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                    placeholder={'Email'}
                    required={true}
                    value={email}
                    className={'w-full mt-2'}
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
            <Footer />
        </div>
    )
}