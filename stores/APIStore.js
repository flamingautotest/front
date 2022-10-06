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
    const { mockData, getMockData } = useMockData()
    const [apiState, apiDispatch] = useImmer({ ...defaultState })
    const requests = new Requests()

    async function makeRequest(path, method = 'get', data = {}) {
		try {
            if (method !== 'get' || method !== 'post' || method !== 'patch' || method !== 'delete') return []

            apiDispatch(api => { api.isLoading = true })

            const realPath = path.startsWith('/') ? path : `/${path}`
            const response = await requests[method](realPath, data)
            return response.data
        } catch (err) {
            console.error('[stores/APIStore/makeRequest]', err)

            const errors = [...apiState.errors, `Network error: failed to request ${path}`]
            apiDispatch(api => {
                api.isLoading = false
                api.errors = errors
            })
        }
	}

    async function getProjects(userId) {
		try {
            if (!userId) return []

            apiDispatch(api => { api.isLoading = true })

            const projects = await getMockData('projects')
            const tests = await getMockData('tests')
            const endpoints = await getMockData('endpoints')

            // TODO: make request for projects
            apiDispatch(api => {
                api.isLoading = false
                api.projects = projects
                api.tests = tests
                api.endpoints = endpoints
            })

            return projects
        } catch (err) {
            console.error('[stores/APIStore/getProjects]', err)

            const errors = [...apiState.errors, `Network error: failed to request projects`]
            apiDispatch(api => {
                api.isLoading = false
                api.errors = errors
            })
        }
	}

    return (
        <APIContext.Provider value={{ apiState, apiDispatch, makeRequest, getProjects }}>
            {children}
        </APIContext.Provider>
    )
}

export {
    APIContext,
    APIProvider
}