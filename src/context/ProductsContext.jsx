import { createContext, useContext, useState } from "react";
import {
    createProductRequest,
    getProductsRequest,
    deleteProductRequest,
    getProductRequest,
    updateProductRequest
} from "../api/products";

const ProductsContext = createContext();

export const useProducts = () => { // Hook personalizado para usar el contexto de productos en cualquier componente
    const context = useContext(ProductsContext);

    if (!context) {
        throw new Error("useProducts debe estar dentro de un ProductsProvider");
    }

    return context;
};

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);

    // Funcion para crear un producto
    const createProduct = async (product) => {
        try {
            // console.log(product);
            await createProductRequest(product);
            getProducts();
        } catch (error) {
            console.log(error);
        } // Fin de createProduct
    };

    // Funcion para obtener el listado de productos de la base de datos
    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            // Asignamos la respuesta del backend al arreglo de productos
            setProducts(res.data);
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    } // Fin de getProducts

    // Funcion para eliminar un producto de la base de datos
    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            console.log(res.data);
            if (res.status === 200)
                setProducts(products.filter(product => product._id != id));
        } catch (error) {
            console.log(error)
        }
    } // Fin de deleteProduct

    //Funcion para obtener un producto por id de la base de datos
    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id)
            //console.log(res);
            return res.data
        } catch (error) {
            console.log(error)
        }
    }//Fin del getProduct

    //Funcion para editar un producto de la base de datos
    const updateProduct = async (id, product) => {
        try {
            await updateProductRequest(id, product);
        } catch (error) {
            console.log(error)
        }
    } //Fin del updateProduct

    return (
        <ProductsContext.Provider value={{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProduct,
            updateProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}//Fin del useProvider

export default ProductsProvider;
