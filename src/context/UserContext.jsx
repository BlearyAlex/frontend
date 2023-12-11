import { createContext, useContext, useState } from "react";
import {
    createUserRequest,
    getUsersRequest,
    getUserRequest,
    updateUserRequest,
    deleteUserRequest,
} from "../api/user";

const UsersContext = createContext();

export const useUsers = () => {
    // Hook personalizado para usar el contexto de productos en cualquier componente
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error("useProducts debe estar dentro de un ProductsProvider");
    }

    return context;
};

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);

    // Funcion para crear un usuario
    const createUser = async (user) => {
        try {
            // console.log(product);
            await createUserRequest(user);
            getUser();
        } catch (error) {
            console.log(error);
        } // Fin de createUser
    };

    // Funcion para obtener el listado de usuarios de la base de datos
    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            // Asignamos la respuesta del backend al arreglo de productos
            setUsers(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }; // Fin de getUsers

    // Funcion para eliminar un usuario de la base de datos
    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            console.log(res.data);
            if (res.status === 200) setUsers(users.filter((user) => user._id != id));
        } catch (error) {
            console.log(error);
        }
    }; // Fin de deleteProduct

    //Funcion para obtener un usuario por id de la base de datos
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            //console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }; //Fin del getProduct

    //Funcion para editar un usuario de la base de datos
    const updateUser = async (id, product) => {
        try {
            await updateUserRequest(id, product);
        } catch (error) {
            console.log(error);
        }
    }; //Fin del updateProduct

    return (
        <UsersContext.Provider
            value={{
                users,
                createUser,
                getUsers,
                deleteUser,
                getUser,
                updateUser,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
} //Fin del useProvider

export default UsersProvider;
