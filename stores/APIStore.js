import { createContext } from "react"
import { useImmer } from 'use-immer'
import { Requests } from '~/utils'

const defaultState = {
    isLoading: false,
    errors: [],
}

const APIContext = createContext()

const APIProvider = ({ children }) => {
    const [apiState, apiDispatch] = useImmer({ ...defaultState })
    const requests = new Requests()

    async function makeRequest(path, method = 'get', data = {}) {
		try {
            apiDispatch(api => { api.isLoading = true })
            const response = await requests[method](path, data)
            return response.data
        } catch (err) {
            console.error('[APIStore/makeRequest]', err)

            apiDispatch(api => {
                api.isLoading = false
                api.errors = api.errors.push(`Network error: failed to request ${path}`)
            })
        }
	}

    return (
        <APIContext.Provider value={{ apiState, apiDispatch, makeRequest }}>
            {children}
        </APIContext.Provider>
    )
}

export {
    APIContext,
    APIProvider
}