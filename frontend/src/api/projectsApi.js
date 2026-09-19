import axiosClient from './axiosClient';

export function getProjects() {
  return axiosClient.get('/projects');
}

export function getProject(id) {
  return axiosClient.get(`/projects/${id}`);
}

export function createProject(formData) {
  return axiosClient.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function updateProject(id, formData) {
  formData.append('_method', 'PUT');
  return axiosClient.post(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function deleteProject(id) {
  return axiosClient.delete(`/projects/${id}`);
}