import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const EditUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/api/auth/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                console.error('Erro ao carregar o usuário:', err);
                setError('Erro ao carregar os dados do usuário.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/auth/users/${userId}`, user);
            alert('Usuário atualizado com sucesso!');
            navigate('/users');
        } catch (err) {
            console.error('Erro ao atualizar o usuário:', err);
            setError('Erro ao atualizar os dados do usuário.');
        }
    };

    if (loading) return <p>Carregando dados do usuário...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Editar Usuário</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={user.name || ''}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={user.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditUser;
