import React, { useState } from 'react';
import api from '../../api/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            debugger
            const response = await api.post('/api/auth/register', formData);
            console.log('Usuário registrado com sucesso:', response.data);
            alert('Usuário registrado com sucesso:')
        } catch (err) {
            console.error('Erro ao registrar:', err.response?.data.message || err.message);
            setError(err.response?.data.message || 'Erro desconhecido');
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nome" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
