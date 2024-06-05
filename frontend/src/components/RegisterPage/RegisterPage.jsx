import React from 'react';
import { FaUser, FaLock, FaMailBulk, FaAddressCard, FaRegCalendar } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const URI = 'http://localhost:8000/users/';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, { 
                users_name: name, 
                users_lastname: lastName, 
                users_email: email, 
                users_birthdate: birthdate, 
                users_password: password, 
                users_username: username
            });
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Tu cuenta ha sido creada correctamente.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
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
            <form onSubmit={store}>
                <h1>Registrate</h1>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Nombre de usuario' 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Nombres' 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <FaAddressCard className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Apellidos' 
                        required 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <FaAddressCard className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='email' 
                        placeholder='Email' 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <FaMailBulk className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='date' 
                        required 
                        value={birthdate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                    />
                    <FaRegCalendar className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='password' 
                        placeholder='Contraseña' 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className='icon' />
                </div>
                <button className = "LR-page-button" type="submit">Registrarse</button>
                <div className="register-link">
                    <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </form>
            </div>
        </div>
    );
};

export default RegisterPage;
