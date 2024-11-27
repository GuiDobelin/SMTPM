import React, { useState } from 'react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            login(response.data.token);
            console.log('Login bem-sucedido:', response.data);
        } catch (err) {
            console.error('Erro no login:', err.response?.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
            <button type="submit">Entrar</button>
        </form>
    );
};

export default Login;
