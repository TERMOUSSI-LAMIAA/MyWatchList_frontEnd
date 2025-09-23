import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ton backend

export const api = axios.create({
  baseURL: API_URL
});
