import axiosClient from './axiosClient';

export function getAchievements() {
  return axiosClient.get('/achievements');
}

export function createAchievement(data) {
  return axiosClient.post('/achievements', data);
}

export function updateAchievement(id, data) {
  return axiosClient.put(`/achievements/${id}`, data);
}

export function deleteAchievement(id) {
  return axiosClient.delete(`/achievements/${id}`);
}