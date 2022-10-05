import { createContext } from "react"
import { useImmer } from 'use-immer'
import { Requests } from '~/utils'

// mockdata
const projects = [{
    id : '1',
    name : 'test1',
    creation_date : 'dateString',
    frequency: '15 minutes',
    last_execution : {
        status: 'success',
        date: 'datestring'
    }
}, {
    id : '2',
    name : 'test2',
    creation_date : 'dateString',
    frequency: '15 minutes',
    last_execution : {
        status: 'failure',
        date: 'datestring'
    }
},{
    id : '3',
    name : 'test3',
    creation_date : 'dateString',
    frequency: '15 minutes',
    last_execution : {
        status: 'failure',
        date: 'datestring'
    }
},{
    id : '4',
    name : 'test4',
    creation_date : 'dateString',
    frequency: '4 minutes',
    last_execution : {
        status: 'warning',
        date: 'datestring'
    }
},]


const defaultState = {
    isLoading: false,
    errors: [],
    projects: [],
}

const APIContext = createContext()

const APIProvider = ({ children }) => {
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

            // TODO: make request for projects
            apiDispatch(api => {
                api.isLoading = false
                api.projects = projects
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