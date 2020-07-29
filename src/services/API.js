import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api.tibiadata.com/v2/',
});

export default API;