import { createContext } from "react"
import { useImmer } from 'use-immer'
import { Requests } from '~/utils'
import { useMockData } from '~/hooks'

// mockdata
const defaultState = {
    isLoading: false,
    errors: [],
    projects: [],
    tests: [],
    endpoints: [], 
}

const APIContext = createContext()

const APIProvider = ({ children }) => {
    const { getMockData } = useMockData()
    const [apiState, apiDispatch] = useImmer({ ...defaultState })

    async function makeRequest({
        method = 'get',
        path = '',
        modifier = (a) => a,
        data = {},
    }) {
		try {
            if (method !== 'get' || method !== 'post' || method !== 'patch' || method !== 'delete') throw new Error('Invalid method')
            if (!path.length) throw new Error('No path provided')
            if (typeof modifier !== 'function') throw new Error('Invalid modifier')

            apiDispatch(api => { api.isLoading = true })

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
        } catch (err) {
            console.error('[stores/APIStore/makeRequest]', err)

            const errors = [...apiState.errors, `Network error: failed to request ${path}`]
            apiDispatch(api => {
                api.isLoading = false
                api.errors = errors
            })
        }
	}

    // mock function - use makeRequest for prod
    async function getProjects(userId) {
		try {
            if (!userId) return []

            apiDispatch(api => { api.isLoading = true })

            const projects = await getMockData('projects')

            // TODO: make request for projects
            apiDispatch(api => {
                api.isLoading = false
                api.projects = projects
            })
        } catch (err) {
            console.error('[stores/APIStore/getProjects]', err)

            const errors = [...apiState.errors, `Network error: failed to request projects`]
            apiDispatch(api => {
                api.isLoading = false
                api.errors = errors
            })
        }
	}

    async function getTestSuites(userId, projectId) {
		try {
            if (!userId) return []

            apiDispatch(api => { api.isLoading = true })

            const tests = await getMockData('tests')

            // TODO: make request for test suites using projectId param
            apiDispatch(api => {
                api.isLoading = false
                api.tests = tests
            })
        } catch (err) {
            console.error('[stores/APIStore/getTestSuites]', err)

            const errors = [...apiState.errors, `Network error: failed to request test suites`]
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
            getProjects,
            getTestSuites
        }}>
            {children}
        </APIContext.Provider>
    )
}

export {
    APIContext,
    APIProvider
}