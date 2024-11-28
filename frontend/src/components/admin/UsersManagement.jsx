import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import api from '../../api/api'; 

const UsersManagement = () => {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [errorMessage, setErrorMessage] = useState(null); 
    const { user } = useAuth(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/auth/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage('Você não está autorizado a acessar esta página.');
                } else {
                    setErrorMessage('Erro ao carregar os usuários. Tente novamente mais tarde.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (userId) => {
        if (userId === user.id) {
            alert('Você não pode deletar o próprio usuário.');
            return;
        }
        setIsDeleting(true);
        try {
            await api.delete(`/api/auth/delete/${userId}`);
            setUsers(users.filter((u) => u.id !== userId));
            alert('Usuário deletado com sucesso.');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            setErrorMessage('Falha ao deletar o usuário.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (userId) => {
        navigate(`/api/auth/users/${userId}`); 
    };

    if (loading) return <p>Carregando usuários...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;

    return (
        <div>
            <h1>Gerenciamento de Usuários</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                                <button onClick={() => handleEdit(u.id)}>Editar</button>
                                <button onClick={() => handleDelete(u.id)} disabled={isDeleting}>
                                    {isDeleting ? 'Excluindo...' : 'Excluir'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersManagement;
