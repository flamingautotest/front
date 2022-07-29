const data = []

const get = (key) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = data.find(item => item.key === key)
            resolve(res)
        }, 1000)
    })
}

export default {
    data,
    get,
}