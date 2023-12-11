import { createContext, useContext, useState } from "react";
import {
    createLibroRequest,
    getLibrosRequest,
    getLibroRequest,
    updateLibroRequest,
    deleteLibroRequest,
} from "../api/libros";

const LibrosContext = createContext();

export const useLibros = () => { // Hook personalizado para usar el contexto de productos en cualquier componente
    const context = useContext(LibrosContext);

    if (!context) {
        throw new Error("useProducts debe estar dentro de un ProductsProvider");
    }

    return context;
};

export function LibrosProvider({ children }) {
    const [libros, setLibros] = useState([]);

    // Funcion para crear un libro
    const createLibro = async (libro) => {
        try {

            await createLibroRequest(libro);
            getLibros();
        } catch (error) {
            console.log(error);
        } // Fin de createLibro
    };

    // Funcion para obtener el listado de libros de la base de datos
    const getLibros = async () => {
        try {
            const res = await getLibrosRequest();
            // Asignamos la respuesta del backend al arreglo de productos
            setLibros(res.data);
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    } // Fin de getLibros

    // Funcion para eliminar un libro de la base de datos
    const deleteLibro = async (id) => {
        try {
            const res = await deleteLibroRequest(id);
            console.log(res.data);
            if (res.status === 200)
                setLibros(libros.filter(libro => libro._id != id));
        } catch (error) {
            console.log(error)
        }
    } // Fin de deleteLibro

    //Funcion para obtener un libro por id de la base de datos
    const getLibro = async (id) => {
        try {
            const res = await getLibroRequest(id)
            //console.log(res);
            return res.data
        } catch (error) {
            console.log(error)
        }
    }//Fin del getProduct

    //Funcion para editar un libro de la base de datos
    const updateLibro = async (id, libro) => {
        try {
            await updateLibroRequest(id, libro);
            console.log("Libro actualizado")
        } catch (error) {
            console.log(error)
        }
    } //Fin del updateLibro

    return (
        <LibrosContext.Provider value={{
            libros,
            createLibro,
            getLibros,
            deleteLibro,
            getLibro,
            updateLibro
        }}>
            {children}
        </LibrosContext.Provider>
    )
}//Fin del useProvider

export default LibrosProvider;
