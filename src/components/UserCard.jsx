import { useUsers } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { IoTrashBinSharp, IoPencilSharp } from "react-icons/io5";

function UserCard({ user }) {
    const { deleteUser } = useUsers()

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-1xl font-bold">{user.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-600
                                    text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            deleteUser(user._id);
                        }}
                    >
                        <IoTrashBinSharp />
                    </button>
                    <Link to={'/users/' + user._id}
                        className="bg-green-500 hover:bg-green-600
                        text-white px-4 py-2 rounded-lg"
                    >
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>
            <p className="text-slate-300 my-2">
                {user.carrera}
            </p>
            <p className="text-slate-300 my-2">
                {user.numeroControl}
            </p>
            <p className="text-slate-300 my-2">
                {user.telefono}
            </p>
        </div>
    )
}

export default UserCard;