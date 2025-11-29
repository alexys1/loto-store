// Detecta si estamos en local o en la nube
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;