import axios from 'axios'
import { constants, jwt } from '~/utils'

export default class Requests {
    constructor() {
        const token = jwt.getJWT()
        const options = {
            baseURL: constants.API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (token.length) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        }

        this.axios = axios.create(options)

        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
        this.patch = this.patch.bind(this)
    }

    get(url) {
        return this.axios.get(url)
    }

    post(url, data) {
        return this.axios.post(url, data)
    }

    put(url, data) {
        return this.axios.put(url, data)
    }

    delete(url) {
        return this.axios.delete(url)
    }

    patch(url, data) {
        return this.axios.patch(url, data)
    }
}