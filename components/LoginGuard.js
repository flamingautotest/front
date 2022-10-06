import { UserContext } from '~/stores'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function LoginGuard(props) {
    const { userState } = useContext(UserContext)
	const router = useRouter()

    const allowedRoutes = ['/login', '/register', '/']

    useEffect(() => {
        if (!userState.isLoggedIn && !userState.isLoading && !allowedRoutes.includes(router.route)) {
            console.log('oui')
            router.push('/')
        }
    }, [userState, router.route])

    return props.children
}