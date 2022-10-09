import { UserContext } from '~/stores'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo } from 'react'

export default function LoginGuard(props) {
    const { userState } = useContext(UserContext)
	const router = useRouter()

    const allowedRoutes = useMemo(() => ['/login', '/register', '/'], [])

    useEffect(() => {
        if (!userState.isLoggedIn && !userState.isLoading && !allowedRoutes.includes(router.route)) {
            router.push('/')
        }
    }, [userState, router, allowedRoutes])

    return props.children
}