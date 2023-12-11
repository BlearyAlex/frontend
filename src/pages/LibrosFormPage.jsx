import { useForm } from 'react-hook-form';
import { useLibros } from '../context/LibrosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FaSave } from "react-icons/fa";
import { toast } from 'sonner';

function LibrosFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            titulo: '',

        }
    });

    const { createLibro, getLibro, updateLibro } = useLibros();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadLibro() {
            if (params.id) {
                const libro = await getLibro(params.id);
                setValue('titulo', libro.titulo);
                setValue('autor', libro.autor);
                setValue('editorial', libro.editorial);
                setValue('edicion', libro.edicion);
                setValue('categoria', libro.categoria);
            }
        }

        loadLibro();
    }, [params.id, getLibro, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateLibro(params.id, data);
        } else {
            createLibro(data);
        }
        navigate('/libros');
    });

    return (
        <div className='flex items-center justify-center h-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='name'>Titulo</label>
                    <input
                        type="text"
                        id='titulo'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Nombre del Titulo'
                        {...register('titulo', { required: true })}
                        autoFocus
                    />
                    {errors.titulo && (
                        <div className='text-red-500'>Nombre del libro es requerido</div>
                    )}

                    <label htmlFor='autor'>Autor</label>
                    <input
                        type="text"
                        id="autor"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Nombre del Autor'
                        {...register('autor', {
                            required: true,
                        })}
                    />
                    {errors.autor && (
                        <div className='text-red-500'>El nombre del autor es requerido</div>
                    )}

                    <label htmlFor='editorial'>Editorial</label>
                    <input
                        type="text"
                        id="editorial"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Nombre de la Editorial'
                        {...register('editorial', {
                            required: true,
                        })}
                    />
                    {errors.editorial && (
                        <div className='text-red-500'>Nombre de editorial es requerido</div>
                    )}


                    <label htmlFor='edicion'>Edicion</label>
                    <input
                        type="text"
                        id='edicion'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Nombre de edicion'
                        {...register('edicion', {
                            required: true,
                        })}
                    />
                    {errors.edicion && (
                        <div className='text-red-500'>Nombre de edicion es requerido</div>
                    )}

                    <label htmlFor='categoria'>Categoria</label>
                    <input
                        type="text"
                        id='categoria'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Categoria del libro'
                        {...register('categoria', {
                            required: true,
                        })}
                    />
                    {errors.categoria && (
                        <div className='text-red-500'>Nombre de categoria es requerido</div>
                    )}

                    <button className='bg-zinc-700 flex items-center px-3 py-3 my-3 rounded-md text-white hover:scale-110 ease-linear duration-100' type="submit">
                        <FaSave size={30} className='mr-2' /> Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LibrosFormPage;
