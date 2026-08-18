import api from './api'

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then(r => r.data),

  register: (data) =>
    api.post('/auth/register', data).then(r => r.data),

  logout: () =>
    api.post('/auth/logout').then(r => r.data),

  getCurrentUser: () =>
    api.get('/auth/me').then(r => r.data),

  refreshToken: () =>
    api.post('/auth/refresh').then(r => r.data),
}

export default authService
