import axiosClient from './axiosClient';

export function getPersonalInfo() {
  return axiosClient.get('/personal-info');
}

export function updatePersonalInfo(formData) {
  return axiosClient.post('/personal-info/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}