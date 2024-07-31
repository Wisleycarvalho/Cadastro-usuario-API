import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  // Define um estado para armazenar a lista de usuários
  const [users, setUsers] = useState([])

  // Cria referências para os campos de entrada do formulário
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // Função para buscar usuários da API
  async function getUsers(){
    const usersFromApi = await api.get('/users')
    // Atualiza o estado com os dados dos usuários
    setUsers(usersFromApi.data)
  }

  // Função para criar um novo usuário
  async function createUsers(){
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    // Recarrega a lista de usuários após a criação
    getUsers()
  }

  // Função para deletar um usuário
  async function deleteUsers(id){
    await api.delete(`/users/${id}`)
    // Recarrega a lista de usuários após a deleção
    getUsers()
  }

  // Hook useEffect para carregar a lista de usuários quando o componente é montado
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='formulary'>
        <form>
          <h1>Cadastro usuário</h1>
          {/* Campos de entrada para nome, idade e email */}
          <input placeholder='nome' type="text" name='nome' ref={inputName}/>
          <input placeholder='idade' type="number" name='age' ref={inputAge}/>
          <input placeholder='email' type="email" name='email' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

        {/* Renderiza a lista de usuários */}
        {users.map((user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            {/* Botão para deletar um usuário */}
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Delete"/>
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
