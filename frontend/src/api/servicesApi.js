import axiosClient from './axiosClient';

export function getServices() {
  return axiosClient.get('/services');
}

export function createService(formData) {
  return axiosClient.post('/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function updateService(id, formData) {
  formData.append('_method', 'PUT');
  return axiosClient.post(`/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function deleteService(id) {
  return axiosClient.delete(`/services/${id}`);
}