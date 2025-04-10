import axios from 'axios';

const API_URL = process.env.VITE_REACT_APP_API_URL || 'http://localhost:8000/api';

// Get all items
export const getAllItems = async () => {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
};

// Create item
export const createItem = async (itemData) => {
    const response = await axios.post(`${API_URL}/items`, itemData);
    return response.data;
};

// Update item
export const updateItem = async (id, itemData) => {
    const response = await axios.put(`${API_URL}/items/${id}`, itemData);
    return response.data;
};

// Delete item
export const deleteItem = async (id) => {
    const response = await axios.delete(`${API_URL}/items/${id}`);
    return response.data;
};
