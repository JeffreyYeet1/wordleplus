// src/api/axios.js (or wherever you want to configure Axios)
import axios from 'axios';

const AxiosAPI = axios.create({
  baseURL: 'http://localhost:5001', // Use the service name in Docker
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosAPI;