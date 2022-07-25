import { useState } from "react"
import { Input, Button } from "~/components"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit login. replace with login function')
        console.log(email, password)
    }

    // TODO: add errors, loading, etc.
    return (
        <form className="flex flex-col pt-28 items-center justify-center w-60 mx-auto">
            <h1 className="text-xl font-bold mb-4">Login to AutoTest</h1>
            <Input
                label={'Email'}
                name={'email'}
                type={'email'}
                placeholder={'Email'}
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                label={'Password'}
                name={'password'}
                type={'password'}
                placeholder={'Password'}
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                className={'mt-4'}
                onClick={handleSubmit}
                fullWidth
            >
                Login
            </Button>
        </form>
    )
}