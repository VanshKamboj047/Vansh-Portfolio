import axiosClient from './axiosClient';

export function getEducation() {
  return axiosClient.get('/educations');
}

export function createEducation(data) {
  return axiosClient.post('/educations', data);
}

export function updateEducation(id, data) {
  return axiosClient.put(`/educations/${id}`, data);
}

export function deleteEducation(id) {
  return axiosClient.delete(`/educations/${id}`);
}