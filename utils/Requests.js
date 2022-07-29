import axios from 'axios'
import { constants, jwt, mockData } from '~/utils'

export default class Requests {
    constructor(args = { mock: false }) {
        this.mock = args.mock

        const token = jwt.getJWT()
        const options = {
            baseURL: constants.API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (token.length) options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` }

        this.axios = axios.create(options)

        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.delete = this.delete.bind(this)
        this.patch = this.patch.bind(this)
    }

    get(url) {
        if (this.mock) return mockData.get(url)
        return this.axios.get(url)
    }

    post(url, data) {
        return this.axios.post(url, data)
    }

    delete(url) {
        return this.axios.delete(url)
    }

    patch(url, data) {
        return this.axios.patch(url, data)
    }
}