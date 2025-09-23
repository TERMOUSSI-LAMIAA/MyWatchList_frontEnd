import { api } from './api';

export function getMedias() {
  return api.get('/');
}

export function addMedia(media) {
  return api.post('/', media);
}

export function updateMedia(id, media) {
  return api.put(`/${id}`, media);
}

export function deleteMedia(id) {
  return api.delete(`/${id}`);
}
