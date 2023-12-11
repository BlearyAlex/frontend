import { useForm } from 'react-hook-form';
import { useUsers } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FaSave } from "react-icons/fa";

function UsersFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            numeroControl: 17450561,

        }
    });

    const { createUser, getUser, updateUser, } = useUsers();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const user = await getUser(params.id);
                setValue('name', user.name);
                setValue('carrera', user.carrera);
                setValue('numeroControl', user.numeroControl);
                setValue('telefono', user.telefono);
            }
        }

        loadUser();
    }, [params.id, getUser, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateUser(params.id, data);
        } else {
            createUser(data);
        }
        navigate('/users');
    });

    return (
        <div className='flex items-center justify-center h-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type="text"
                        id='name'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Nombre del Usuario'
                        {...register('name', { required: true })}
                        autoFocus
                    />
                    {errors.name && (
                        <div className='text-red-500'>Nombre del usuario es requerido</div>
                    )}

                    <label htmlFor='carrera'>Carrera</label>
                    <input
                        type="text"
                        id="carrera"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Carrera del usuario'
                        {...register('carrera', {
                            required: true,
                        })}
                    />
                    {errors.carrera && (
                        <div className='text-red-500'>La carrera es requerido</div>
                    )}


                    <label htmlFor='numeroControl'>Numero de Control</label>
                    <input
                        type="number"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Numero de control del usuario'
                        {...register('numeroControl', {
                            required: true,
                            valueAsNumber: true
                        })}
                    />
                    {errors.numeroControl && (
                        <div className='text-red-500'>Numero de control es requerido</div>
                    )}

                    <label htmlFor='telefono'>Telefono</label>
                    <input
                        type="number"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Numero de telefono del usuario'
                        {...register('telefono', {
                            required: true,
                            valueAsNumber: true
                        })}
                    />
                    {errors.numeroControl && (
                        <div className='text-red-500'>Numero de telefono es requerido</div>
                    )}

                    <button className='bg-zinc-700 flex items-center justify-center text-center px-3 py-3 my-3 rounded-md text-white hover:scale-110 ease-linear duration-100' type="submit">
                        <FaSave size={30} className='mr-2' /> Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UsersFormPage;
