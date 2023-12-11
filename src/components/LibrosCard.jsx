import { useLibros } from '../context/LibrosContext'
import { Link } from 'react-router-dom';
import { IoTrashBinSharp, IoPencilSharp } from "react-icons/io5";

function LibrosCard({ libro }) {
    const { deleteLibro } = useLibros()

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-1xl font-bold">{libro.titulo}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-600
                                    text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            deleteLibro(libro._id);
                        }}
                    >
                        <IoTrashBinSharp />
                    </button>
                    <Link to={'/libros/' + libro._id}
                        className="bg-green-500 hover:bg-green-600
                        text-white px-4 py-2 rounded-lg"
                    >
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>
            <p className="text-slate-300 my-2">
                {libro.autor}
            </p>
            <p className="text-slate-300 my-2">
                { }
            </p>
            <p className="text-slate-300 my-2">
                { }
            </p>
        </div>
    )
}

export default LibrosCard;