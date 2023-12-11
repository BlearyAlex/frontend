import axios from "./axios";

// Llamada al api para obtener todos los usuarios

//Request: peticion al servidor
export const createUserRequest = (user) => axios.post('/users', user);

//Response: respuesta del servidor
export const getUsersRequest = () => axios.get('/users');

//Request: peticion al servidor
export const getUserRequest = (id) => axios.get('/users/' + id);

//Response: respuesta del servidor
export const updateUserRequest = (id, user) => axios.patch('/users/' + id, user);

//Request: peticion al servidor
export const deleteUserRequest = (id) => axios.delete('/users/' + id);