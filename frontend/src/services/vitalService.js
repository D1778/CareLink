import api from './api'

export const vitalService = {
  getByPatient: (patientId) => api.get(`/vitals/${patientId}`).then(r => r.data),
  create:       (data)      => api.post('/vitals', data).then(r => r.data),
  getLatest:    (patientId) => api.get(`/vitals/${patientId}/latest`).then(r => r.data),
}

export default vitalService
