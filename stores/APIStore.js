import { createContext } from "react"
import { useImmer } from 'use-immer'
import { Requests } from '~/utils'

const defaultState = {
    isLoading: false,
    errors: [],
    projects: [],
    tests: [],
    testSuites: [],
    endpoints: [],
}

const APIContext = createContext()

const APIProvider = ({ children }) => {
    const [apiState, apiDispatch] = useImmer({ ...defaultState })

    async function makeRequest({
        mock = false,
        method = 'get',
        path = '',
        modifier = (a) => a,
        data = {},
    }) {
		try {
            const _method = method.toLowerCase()
            if (_method !== 'get' && _method !== 'post' && _method !== 'patch' && _method !== 'delete') throw new Error('Invalid method')
            if (!path.length) throw new Error('No path provided')
            if (typeof modifier !== 'function') throw new Error('Invalid modifier')

            if (mock) {
                // TODO: delete this block + condition when API is ready
                apiDispatch(api => { api.isLoading = true })
                apiDispatch((state) => modifier(state))
                apiDispatch(api => {
                    api.isLoading = false
                    api.errors = []
                })
            } else {
                const requests = new Requests()
                const realPath = path.startsWith('/') ? path : `/${path}`
                const response = await requests[method](realPath, data)

                if (response.data?.data) {
                    apiDispatch((state, response) => modifier(state, response))
                    apiDispatch(api => {
                        api.isLoading = false
                        api.errors = []
                    })
                } else {
                    console.log('[stores/APIStore/makeRequest]', err)
                    const errors = [...apiState.errors, `Network error: failed to request ${path}`]
    
                    apiDispatch(api => {
                        api.isLoading = false
                        api.errors = errors
                    })
                }
            }

        } catch (err) {
            console.error('[stores/APIStore/makeRequest]', err)

            const errors = [...apiState.errors, `Network error: failed to request ${path}`]
            apiDispatch(api => {
                api.isLoading = false
                api.errors = errors
            })
        }
	}

    return (
        <APIContext.Provider value={{
            apiState,
            apiDispatch,
            makeRequest,
        }}>
            {children}
        </APIContext.Provider>
    )
}

export {
    APIContext,
    APIProvider
}