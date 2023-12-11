import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/products');
    else console.log("No está autenticado");
  }, [isAuthenticated]);

  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {Array.isArray(signInErrors) ? (
          signInErrors.map((error, i) => (
            <div className='bg-red-500 p-2 my-2 text-white' key={i}>
              {error}
            </div>
          ))
        ) : (
          signInErrors && (
            <div className='bg-red-500 p-2 my-2 text-white'>
              {signInErrors}
            </div>
          )
        )}

        <form onSubmit={onSubmit}>
          <h1 className='text-3xl font-bold my-3'>Login</h1>
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Introduce tu email'
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className='text-red-500'>Email es requerido</p>
          )}

          <label htmlFor='password'>Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Introduce tu contraseña'
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <p className='text-red-500'>Password requerido</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className='text-red-500'>La longitud mínima es de 6 caracteres</p>
          )}

          <button className='flex items-center justify-center bg-zinc-700 px-3 py-3 my-3 rounded-md text-white cursor-pointer'
            type="submit"
            disabled={!captchaValue}
          >
            <IoLogIn size={30} className='mr-2' /> Iniciar Sesión
          </button>

          <ReCaptcha
            sitekey='6Ld_gCwpAAAAAFn-dSh8vyQH2G6Iw4CA_ZufrA7h'
            onChange={(value) => setCaptchaValue(value)}
          />
        </form>
        <p className='flex gap-x-2 justify-between pt-5 mt-5'>
          ¿No tienes una cuenta?
          <Link to="/register" className='text-sky-500'>
            <div className='flex mx-2 px-2 items-start'>
              Crear una cuenta <IoPersonAdd size={30} className='mx-1' />
            </div>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
