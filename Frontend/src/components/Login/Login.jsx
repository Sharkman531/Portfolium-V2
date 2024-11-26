import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../contexts/session.context'
import { login } from '../../services/auth.service'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()  
    const onLogin = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()

        login({ email, password })
        .then( usuario => {

          localStorage.setItem(
            "user", 
            JSON.stringify({ 
              _id: usuario._id,
              email: usuario.email,
              userName: usuario.userName 
            })
          );

            onLogin( usuario.token )
            navigate('/')
        })
        .catch( error => {
            console.log(error)
        })

    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form 
          onSubmit={handleSubmit} 
          className="p-4 shadow-lg rounded" 
          style={{ width: '400px', backgroundColor: '#212529', color: '#fff', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)' }} 
        >
          <h3 className="text-center mb-4 text-white">Iniciar Sesión</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control"
              id="email" 
              placeholder="Ingresa tu correo"
              onChange={handleChangeEmail}
              required
              style={{ backgroundColor: 'whitesmoke', color: '#212529' }} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control"
              id="password" 
              placeholder="Ingresa tu contraseña"
              onChange={handleChangePassword}
              required
              style={{ backgroundColor: 'whitesmoke', color: '#212529' }} 
            />
          </div>
          <button type="submit" className="btn btn-danger w-100 text-white">Iniciar Sesión</button>
          <div className="text-center mt-3">
            <Link to="/register" className="text-decoration-none text-white">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
    );
    
    
}

export default Login