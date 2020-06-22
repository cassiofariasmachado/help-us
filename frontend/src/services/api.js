import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || `${window.location}api`,
})

export default api;