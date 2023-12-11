import axios from "./axios";

// Llamada al api para obtener todos los usuarios

//Request: peticion al servidor
export const createLibroRequest = (libro) => axios.post('/libros', libro);

//Response: respuesta del servidor
export const getLibrosRequest = () => axios.get('/libros');

//Request: peticion al servidor
export const getLibroRequest = (id) => axios.get('/libros/' + id);

//Response: respuesta del servidor
export const updateLibroRequest = (id, libro) => axios.patch('/libros/' + id, libro);

//Request: peticion al servidor
export const deleteLibroRequest = (id) => axios.delete('/libros/' + id);