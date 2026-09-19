import axiosClient from './axiosClient';

export function getExperience() {
  return axiosClient.get('/experiences');
}

export function createExperience(data) {
  return axiosClient.post('/experiences', data);
}

export function updateExperience(id, data) {
  return axiosClient.put(`/experiences/${id}`, data);
}

export function deleteExperience(id) {
  return axiosClient.delete(`/experiences/${id}`);
}