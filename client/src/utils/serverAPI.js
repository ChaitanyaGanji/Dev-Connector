import axios from 'axios';

const serverAPI = axios.create({
  baseURL: 'http://localhost:5000',
});
export default serverAPI;
