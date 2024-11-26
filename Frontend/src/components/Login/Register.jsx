import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
import { usuarioSchema } from '../../../../Backend/schemas/usuario.validate';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await usuarioSchema.validate({
        email,
        password,
        passwordConfirm: passwordVerify,
      });

      await register({ email, password, confirmPassword: passwordVerify });
      navigate('/login');
    } catch (validationError) {

      if (validationError.name === 'ValidationError') {
        setError(validationError.message);
      } else {

        setError(
          validationError.response?.data?.message ||
            'Ocurrió un error inesperado al registrar. Intenta nuevamente.'
        );
      }
    }
  };

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangePasswordVerify = (event) =>
    setPasswordVerify(event.target.value);

  const getInputClassNamePass = () => {
    return password !== passwordVerify ? 'form-control is-invalid' : 'form-control';
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded"
        style={{
          width: '400px',
          backgroundColor: '#212529',
          color: '#fff',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h3 className="text-center mb-4 text-white">Registrar Usuario</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={handleChangeEmail}
            required
            style={{ backgroundColor: 'whitesmoke', color: '#212529' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className={getInputClassNamePass()}
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={handleChangePassword}
            required
            style={{ backgroundColor: 'whitesmoke', color: '#212529' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordVerify" className="form-label">Repetir contraseña</label>
          <input
            type="password"
            className={getInputClassNamePass()}
            id="passwordVerify"
            placeholder="Ingresa tu contraseña nuevamente"
            value={passwordVerify}
            onChange={handleChangePasswordVerify}
            required
            style={{ backgroundColor: 'whitesmoke', color: '#212529' }}
          />
        </div>
        <button type="submit" className="btn btn-danger w-100 text-white">Registrar!</button>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none text-white">¿Ya tienes usuario?</Link>
        </div>
        {error && (
          <div className="text-center mt-3">
            <p className="text-danger">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
