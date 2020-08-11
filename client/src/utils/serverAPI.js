import axios from 'axios';

const serverAPI = axios.create({
  baseURL: 'https://shielded-savannah-91452.herokuapp.com',
});
export default serverAPI;
