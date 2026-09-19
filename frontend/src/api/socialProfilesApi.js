import axiosClient from './axiosClient';

export function getSocialProfiles() {
  return axiosClient.get('/social-profiles');
}

export function createSocialProfile(formData) {
  return axiosClient.post('/social-profiles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function updateSocialProfile(id, formData) {
  formData.append('_method', 'PUT');
  return axiosClient.post(`/social-profiles/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function deleteSocialProfile(id) {
  return axiosClient.delete(`/social-profiles/${id}`);
}