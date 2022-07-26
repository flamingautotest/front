import { createContext } from 'react'
import { useImmer } from 'use-immer'

const defaultState = {
    isLoggedIn: false,
    email: '',
    errors: [],
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useImmer({ ...defaultState });
    
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