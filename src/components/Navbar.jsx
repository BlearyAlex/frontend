import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { MdBookmarkAdd } from "react-icons/md";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-[#41b2d8] my-3 py-3 px-10 rounded-lg flex justify-between items-center">
      <Link to={isAuthenticated ? '/products' : '/'}>
        <h1 className="text-2xl font-bold text-white">Productos</h1>
      </Link>
      <Link to={isAuthenticated ? '/users' : '/'}>
        <h1 className="text-2xl font-bold text-white">Usuarios</h1>
      </Link>
      <Link to={isAuthenticated ? '/libros' : '/'}>
        <h1 className="text-2xl font-bold text-white">Libros</h1>
      </Link>
      <ul className="flex gap-x-4 items-center">
        {isAuthenticated ? (
          <>
            <li className="flex items-center">
              <IoPerson size={24} />
              <span className="ml-2 text-white">{user.username}</span>
            </li>
            <li>
              <Link
                to='/add-product'
                className="flex items-center bg-zinc-500 px-3 py-1 rounded-sm"
              >
                <IoAddCircle size={24} />
              </Link>
            </li>
            <li>
              <Link
                to='/add-user'
                className="flex items-center bg-zinc-500 px-3 py-1 rounded-sm"
              >
                <IoMdPersonAdd size={24} />
              </Link>
            </li>
            <li>
              <Link
                to='/add-libro'
                className="flex items-center bg-zinc-500 px-3 py-1 rounded-sm"
              >
                <MdBookmarkAdd size={24} />
              </Link>
            </li>
            <li>
              <Link
                to='/'
                onClick={() => logout()}
                className="flex items-center bg-zinc-500 px-3 py-1 rounded-sm"
              >
                <IoLogOut size={24} />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to='/login'
                className="flex items-center bg-zinc-500 px-3 py-1 rounded-sm"
              >
                <IoLogIn size={24} />
              </Link>
            </li>
            <li>
              <Link
                to='/register'
                className="flex items-center bg-zinc-500 px-3 py-1 rounded-sm"
              >
                <IoPersonAdd size={24} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
