import { createContext, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { jwt, Requests } from '~/utils'

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
        userDispatch(user => { user.isLoading = true })

        if (!jwt.getJWT().length) return

        const req = new Requests()
        const reqMock = new Requests({ mock: true })

        try {
            const res = await req.get('/users')
            // TODO: remove this when API is ready
            const resMock = await reqMock.get('projectsReferences')

            if (res.data) {
                console.log(res.data)

                userDispatch(user => {
                    user.isLoggedIn = true
                    user.isLoading = false
                    user.id = res.data.id
                    user.email = res.data.email
                    user.firstName = res.data.first_name
                    user.lastName = res.data.last_name
                    user.projectsReferences = resMock.data.projectsReferences
                    user.errors = []
                })
            }
        } catch (err) {
            userDispatch(user => {
                user.isLoading = false
                user.errors = user.errors.push(err)
            })
            console.log(err)
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