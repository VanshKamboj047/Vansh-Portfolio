import axiosClient from './axiosClient';

export function sendMessage(data) {
  return axiosClient.post('/messages', data);
}

export function getMessages() {
  return axiosClient.get('/messages');
}

export function markAsRead(id) {
  return axiosClient.put(`/messages/${id}`);
}

export function deleteMessage(id) {
  return axiosClient.delete(`/messages/${id}`);
}