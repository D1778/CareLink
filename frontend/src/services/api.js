import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const stored = localStorage.getItem('cl_user')
  if (stored) {
    try {
      const user = JSON.parse(stored)
      if (user.token) config.headers.Authorization = `Bearer ${user.token}`
    } catch {}
  }
  return config
})

// Handle 401 — redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cl_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
