import React, { useState } from 'react';
import './LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const URI = "http://localhost:8000/users/login";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, { username, password });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: response.data.message,
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('profileImage', response.data.profileImage);
                navigate('/books');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.message : 'Error de servidor',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
      <div className = "LRbody">
                <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Inicia Sesión</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Nombre de usuario'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Contraseña'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon'/>
                </div>
                <button className = "LR-page-button"type='submit'>Iniciar Sesión</button>
                <div className='register-link'>
                    <p>No tienes una cuenta? <Link to='/register'>Regístrate</Link></p>
                </div>
            </form>
        </div>
      </div>
    );
};

export default LoginPage;