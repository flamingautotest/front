function getJWT() {
    if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('_auth_token')

        if (token) return token
        return ''
    }

    return ''
}

function setJWT(jwt = '') {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('_auth_token', jwt)
    }
}

function removeJWT() {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem('_auth_token')
    }
}

export default {
    getJWT,
    setJWT,
    removeJWT,
}