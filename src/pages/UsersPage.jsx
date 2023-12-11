import { useEffect } from 'react'
import { useUsers } from '../context/UserContext'
import UserCard from '../components/UserCard'

function UsersPage() {
  const { getUsers, users } = useUsers()


  useEffect(() => {
    getUsers()
  }, []);


  if (users.length === 0)
    return (<h1>No hay usuarios para listar</h1>);

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
      {
        users.map((user) => (
          <UserCard user={user}
            key={user._id}
          />
        ))
      }
    </div>
  )
}

export default UsersPage