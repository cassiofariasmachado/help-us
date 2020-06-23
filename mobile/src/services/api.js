import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-18-210-16-33.compute-1.amazonaws.com/api',
});

export default api;