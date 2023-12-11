import { useForm } from 'react-hook-form';
import { useProducts } from '../context/ProductsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FaSave } from "react-icons/fa";

function ProductsFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      year: new Date().getFullYear(),
      price: 0.0
    }
  });
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('year', product.year);
      }
    }

    loadProduct();
  }, [params.id, getProduct, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(data);
    }
    navigate('/products');
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
            placeholder='Nombre del producto'
            {...register('name', { required: true })}
            autoFocus
          />
          {errors.name && (
            <div className='text-red-500'>Nombre del producto es requerido</div>
          )}

          <label htmlFor='price'>Precio</label>
          <input
            type="number"
            step="0.10"
            id="price"
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Precio del producto'
            {...register('price', {
              required: true,
              min: 0.0,
              valueAsNumber: true
            })}
          />
          {errors.price && (
            <div className='text-red-500'>Precio del producto es requerido</div>
          )}
          {errors.price?.type === "min" && (
            <div className='text-red-500'>El precio mínimo es 0</div>
          )}

          <label htmlFor='year'>Año</label>
          <input
            type="number"
            max={new Date().getFullYear()}
            min="1900"
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Año del producto'
            {...register('year', {
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
              valueAsNumber: true
            })}
          />
          {errors.year && (
            <div className='text-red-500'>Año del producto es requerido</div>
          )}
          {errors.year?.type === "min" && (
            <div className='text-red-500'>El año mínimo es 1900</div>
          )}
          {errors.year?.type === "max" && (
            <div className='text-red-500'>El año máximo es {new Date().getFullYear()}</div>
          )}

          <button className='bg-zinc-700 flex items-center px-3 py-3 my-3 rounded-md text-white hover:scale-110 ease-linear duration-100' type="submit">
            <FaSave size={30} className='mr-2' /> Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsFormPage;
