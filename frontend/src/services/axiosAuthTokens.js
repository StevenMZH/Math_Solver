import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = window._env_.REACT_APP_API_URL;
  console.log(API_URL)

const axiosAuthTokens = axios.create({
  baseURL: API_URL, // URL de la API
  headers: {
    'Content-Type': 'application/json',
  }
});

// Verificar si el token ha expirado
function isTokenExpired() {
  console.log(API_URL)
  const token = localStorage.getItem('accessToken');
  if (token) {
    const { exp } = jwtDecode(token);
    return Date.now() / 1000 >= exp; // Si el token ha expirado
  }
  return true;
}

// Interceptor para agregar el token de acceso
axiosAuthTokens.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken');

    if (token && !isTokenExpired()) {
      // Si el token es válido, se agrega al encabezado de la solicitud
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    }

    // Si el token ha expirado, intentamos renovar
    if (token) {
      // Si hay un accessToken, pero está expirado, intentamos renovarlo
      try {
        await refreshAccessToken();
        token = localStorage.getItem('accessToken'); // Actualizamos el token después de la renovación
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Si no se puede renovar el token, lo eliminamos y redirigimos al login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject();
      }
    } else {
      return Promise.reject('No access token available');
    }
  },
  (error) => Promise.reject(error)
);

export default axiosAuthTokens;

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post(`${API_URL}/account/token/refresh/`, {
      refresh: refreshToken,
    });
    console.log(response.data.access);

    const accessToken = response.data.access;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (err) {
    console.error('Failed to refresh access token:');
    throw err;
  }
}
