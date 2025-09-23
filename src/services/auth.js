import { api } from './api';

export function login(data) {
  return api.post('/login', data);
}

export function signup(data) {
  return api.post('/signup', data);
}
