import { UserContext } from '~/stores'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function LoginGuard(props) {
    const [lastState, setLastState] = useState(false)
    const { userState } = useContext(UserContext)
	const router = useRouter()
    const required = props.required || false

    useEffect(() => {
        if ((!required && lastState !== userState.isLoggedIn) || required && !userState.isLoggedIn) {
            setLastState(userState.isLoggedIn)
            router.push('/')
        }
    }, [userState])

    return props.children
}