import { useEffect } from 'react'
import { useLibros } from '../context/LibrosContext'
import LibrosCard from '../components/LibrosCard';

function LibrosPage() {
    const { getLibros, libros } = useLibros()


    useEffect(() => {
        getLibros()
    }, []);


    if (libros.length === 0)
        return (<h1>No hay libros para listar</h1>);

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {
                libros.map((libro) => (
                    <LibrosCard libro={libro}
                        key={libro._id}
                    />
                ))
            }
        </div>
    )
}

export default LibrosPage;