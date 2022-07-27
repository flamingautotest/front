import { createContext, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { jwt, Requests } from '~/utils'

const defaultState = {
    isLoggedIn: false,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    fileUrl: '',
    errors: [],
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useImmer({ ...defaultState })

    useEffect(() => {
        async function checkForLogin() {
            if (!jwt.getJWT().length) return
    
            const req = new Requests()
    
            try {
                const res = await req.get('/users')
    
                if (res.data) {
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

        checkForLogin()
    }, [])
    
    return (
        <UserContext.Provider value={[userState, userDispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserProvider
}