import { createContext, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { jwt, Requests } from '~/utils'

const defaultState = {
    isLoggedIn: false,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    fileUrl: 'zzerzer',
    projectsReferences: [],
    errors: [],
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useImmer({ ...defaultState })

    async function loginUser() {
        if (!jwt.getJWT().length) return

        const req = new Requests()

        try {
            const res = await req.get('/users')

            if (res.data) {
                console.log(res.data)

                userDispatch(user => {
                    user.isLoggedIn = true
                    user.id = res.data.id
                    user.email = res.data.email
                    user.firstName = res.data.first_name
                    user.lastName = res.data.last_name
                    user.fileUrl = res.data.file_url
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    function logoutUser() {
        jwt.removeJWT()
		userDispatch(user => {
			user.isLoggedIn = false
            user.id = ''
            user.email = ''
            user.firstName = ''
            user.lastName = ''
            user.fileUrl = ''
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