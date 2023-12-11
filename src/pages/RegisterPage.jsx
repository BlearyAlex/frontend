import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState(null);

    useEffect(() => {
        if (isAuthenticated) navigate('/products');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        if (captchaValue) {
            signup(values);
        } else {
            console.log("Complete el reCAPTCHA.");
        }
    });

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md mx-auto'>
                {errors && Object.values(errors).map((error, i) => (
                    <div className='bg-red-500 p-2 my-2 text-white' key={i}>
                        {error.message}
                    </div>
                ))}
                <h1 className='text-2xl font-bold'>Register</h1>

                <form onSubmit={onSubmit}>
                    <label htmlFor='username'>Usuario</label>
                    <input
                        type="text"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Username'
                        {...register("username", { required: true, minLength: 5 })}
                    />
                    {errors.username?.type === "required" && (
                        <p className='text-red-500'>Nombre de usuario requerido</p>
                    )}
                    {errors.username?.type === "minLength" && (
                        <p className='text-red-500'>La longitud mínima es de 5 caracteres</p>
                    )}
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email'
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <p className='text-red-500'>Email es requerido</p>
                    )}
                    <label htmlFor='Contraseña'>Contraseña</label>
                    <input
                        type="password"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password'
                        {...register("password", { required: true, minLength: 6 })}
                    />
                    {errors.password?.type === "required" && (
                        <p className='text-red-500'>Password requerido</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className='text-red-500'>La longitud mínima es de 6 caracteres</p>
                    )}

                    <ReCAPTCHA
                        sitekey='6LfH7y0pAAAAAK9qHjgZ8TCjnFoy4T1MXLsXpse6'
                        onChange={(value) => setCaptchaValue(value)}
                    />

                    <button className='bg-zinc-700 px-3 py-3 my-3 rounded-md hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer'
                        type="submit"
                        disabled={!captchaValue}
                    >
                        Registrar
                    </button>
                </form>

                <p className='flex gap-x-2 justify-between pt-5 mt-5'>
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className='text-sky-500'>Iniciar Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
