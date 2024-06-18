import { useEffect, useState } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  async function getUsers(){
   const usersFromApi = await api.get('/users')

   setUsers(usersFromApi.data)
   console.log(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='formulary'>
        <form>

          <h1>Cadastro usuário</h1>
          <input placeholder='nome' type="text" name='nome' />
          <input placeholder='idade' type="number" name='age' />
          <input placeholder='email' type="email" name='email' />
          <button  type='button'>Cadastrar</button>
        </form>

        {users.map(user => (
          <div className='card'>
            <div>
              <p>nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button>
              <img src={Trash} />
            </button>
          </div>
        ))}


      </div>

    </>
  )
}

export default Home
