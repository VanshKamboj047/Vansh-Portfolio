import axiosClient from './axiosClient';

export function getSkills() {
  return axiosClient.get('/skills');
}

export function createSkill(data) {
  return axiosClient.post('/skills', data);
}

export function updateSkill(id, data) {
  return axiosClient.put(`/skills/${id}`, data);
}

export function deleteSkill(id) {
  return axiosClient.delete(`/skills/${id}`);
}