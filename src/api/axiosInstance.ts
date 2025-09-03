import axios from 'axios';

export default axios.create({
    // baseURL: process.env.REACT_APP_API_URL + "/api",
    baseURL: "http://10.100.102.223:8000" + "/api",
    headers: {
        'Content-Type': 'application/json'
    }
})