import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest, 
        loginRequest, 
        verifyTokenRequest,
        logoutRequest
    } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => { // Hook personalizado para usar el contexto de productos en cualquier componente
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth debe ser definido en un contexto');
    }
    return context;
}

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState( [] );
    const [loading, setLoading] = useState(true);

    const signup = async (user)=>{
        try{
        const res = await registerRequest(user);
        //console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
        }catch(error){
            console.log(error.response.data.message);
            //Si existe un error al registrar el usuario
            //Guardamos el erroe en la variable
            setErrors(error.response.data.message);
        }
    }//Fin del signup

    const signin = async ( user ) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data)
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error)
            setErrors(error.response.data.message);
        }
    }//Fin del signin

    //Funcion para cerrar sesion
    const logout = () => {
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null)
    } //Fin del logout

    useEffect ( ()=> {
        if (errors.length > 0) {
            const timer = setTimeout( () => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(()=>{
        async function checkLogin(){
            const cookies = Cookies.get();
            //console.log(cookies.token)
            if (!cookies.token){
                //Si no hay un cookie que contenga el token
                setIsAuthenticated(false); //El usuario no esta autenticado
                setLoading(false); //No hay cookie y ya no se cargan los datos
                //Establecemos los datos del usuario
                return setUser(null);
            } //Fin de !cookies.token

            try { //En casi de que si exista un token lo verificamos
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data){ //Si el servidor no responde con un token
                    setIsAuthenticated(false); //El usuario no esta autenticado
                    setLoading(false);
                    return;
                }

                     //En caso de que si exista un token lo verificamos
                     setIsAuthenticated(true); //El usuario ya esta autenticado
                     setUser(res.data); //Establecemos los datos del usuario
                     setLoading(false); //Termino de cargar los datos
                    }catch (error) {
                        console.log(error);
                        setIsAuthenticated(false),
                        setLoading(false);
                        setUser(null);
            }//Fin del catch
        }//Fin de checkLogin

        checkLogin();
        }, []); //Fin del useEffect

    return(
        <AuthContext.Provider value={  {
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading,
            logout
        }  } >
            {children}
        </AuthContext.Provider>
    )
}