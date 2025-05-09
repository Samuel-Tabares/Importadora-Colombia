import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
};

export const fetchProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productos/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching producto ${id}:`, error);
    throw error;
  }
};

export const fetchResenasByProducto = async (productoId) => {
  try {
    const response = await axios.get(`${API_URL}/resenas/por_producto/?producto_id=${productoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reseñas for producto ${productoId}:`, error);
    throw error;
  }
};

export const fetchLikesByProducto = async (productoId) => {
  try {
    const response = await axios.get(`${API_URL}/likes/conteo/?producto_id=${productoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching likes for producto ${productoId}:`, error);
    throw error;
  }
};

export const submitResena = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/resenas/`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting reseña:', error);
    throw error;
  }
};

export const submitLike = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/likes/`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting like:', error);
    throw error;
  }
};

export const getUserIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error getting user IP:', error);
    return '0.0.0.0';
  }
};