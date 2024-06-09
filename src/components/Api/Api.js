import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Your backend URL
  withCredentials: true,
});

export default Api;
