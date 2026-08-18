import api from './api'

export const patientService = {
  getAll:    ()     => api.get('/patients').then(r => r.data),
  getById:   (id)   => api.get(`/patients/${id}`).then(r => r.data),
  create:    (data) => api.post('/patients', data).then(r => r.data),
  update:    (id, data) => api.put(`/patients/${id}`, data).then(r => r.data),
  delete:    (id)   => api.delete(`/patients/${id}`).then(r => r.data),
}

export default patientService
