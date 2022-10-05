import { createContext, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { jwt, Requests, mockData } from '~/utils'

const defaultState = {
    isLoading: false,
    isLoggedIn: false,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    projectsReferences: [],
    errors: [],
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useImmer({ ...defaultState })

    async function loginUser() {        
        try {
            userDispatch(user => { user.isLoading = true })

            if (!jwt.getJWT().length) {
                userDispatch(user => { user.isLoading = false })
                return
            }

            const req = new Requests()
            const res = await req.get('/users/')

            if (res.data) {
                userDispatch(user => {
                    user.isLoggedIn = true
                    user.isLoading = false
                    user.id = res.data.id
                    user.email = res.data.email
                    user.firstName = res.data.first_name
                    user.lastName = res.data.last_name
                    user.projectsReferences = res.data.projectsReferences
                    user.errors = []
                })
            }
        } catch (err) {
            console.error('[stores/userStore/loginUser]', err)

            const errors = [...userState.errors, 'Network error: failed to login']
            userDispatch(user => {
                user.isLoading = false
                user.errors = errors
            })
        }
    }

    function logoutUser() {
        jwt.removeJWT()
		userDispatch(user => {
			user.isLoggedIn = false
            user.isLoading = false
            user.id = ''
            user.email = ''
            user.firstName = ''
            user.lastName = ''
            user.projectsReferences = []
            user.errors = []
		})
	}

    useEffect(() => {
        loginUser()
    }, [])
    
    return (
        <UserContext.Provider value={{ userState, userDispatch, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserProvider
}