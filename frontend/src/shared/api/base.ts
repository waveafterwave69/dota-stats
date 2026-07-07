import axios from 'axios'

export const openDotaApi = axios.create({
    baseURL: 'https://api.opendota.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const myApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

myApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('app_token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
