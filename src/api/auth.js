import axios from './axios';

//const URL = 'http://localhost:4000/api';

// Llamada al api para registrar un usuario 
export const registerRequest = user => axios.post('/register', user);

// Llamada al api para iniciar sesión
export const loginRequest = user => axios.post('/login', user);

// Llamada al api para verificar el token
export const verifyTokenRequest = () => axios.get('/verify');

// Llamada al api para cerrar sesión
export const logoutRequest = () => axios.post('/logout');



