import axiosClient from './axiosClient';

export function getCertifications() {
  return axiosClient.get('/certifications');
}

export function createCertification(formData) {
  return axiosClient.post('/certifications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function updateCertification(id, formData) {
  formData.append('_method', 'PUT');
  return axiosClient.post(`/certifications/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function deleteCertification(id) {
  return axiosClient.delete(`/certifications/${id}`);
}