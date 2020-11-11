import axios from 'axios';

const api = axios.create({
  baseURL: 'https://comboapi.herokuapp.com/api',
});

export default api;
