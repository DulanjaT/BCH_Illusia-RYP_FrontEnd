import axios from 'axios';

const API_URL = process.env.VITE_REACT_APP_API_URL || 'http://localhost:8000/api';


export const registerUser = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData);
    return res.data;
};

export const loginUser = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/login`, userData);
    return res.data;
};
