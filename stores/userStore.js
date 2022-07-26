import { createContext, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { jwt, Requests } from '~/utils'

const defaultState = {
    isLoading: true,
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

            if (res?.error?.length > 0) {
                jwt.removeJWT()
                userDispatch(user => {
                    user.isLoading = false
                    user.isLoggedIn = false
                })
                return
            }

            if (res.data?.data?.id) {
                
                const userData = res.data.data

                userDispatch(user => {
                    user.isLoading = false
                    user.isLoggedIn = true
                    user.id = userData.id
                    user.email = userData.email
                    user.firstName = userData.first_name
                    user.lastName = userData.last_name
                    user.projectsReferences = userData.projectsReferences ? userData.projectsReferences : []
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