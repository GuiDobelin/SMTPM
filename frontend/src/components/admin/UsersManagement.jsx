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
                console.error('Erro ao buscar usu�rios:', error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage('Voc� n�o est� autorizado a acessar esta p�gina.');
                } else {
                    setErrorMessage('Erro ao carregar os usu�rios. Tente novamente mais tarde.');
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
            alert('Voc� n�o pode deletar o pr�prio usu�rio.');
            return;
        }
        setIsDeleting(true);
        try {
            await api.delete(`/api/auth/delete/${userId}`);
            setUsers(users.filter((u) => u.id !== userId));
            alert('Usu�rio deletado com sucesso.');
        } catch (error) {
            console.error('Erro ao deletar usu�rio:', error);
            setErrorMessage('Falha ao deletar o usu�rio.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (userId) => {
        navigate(`/api/auth/users/${userId}`); 
    };

    if (loading) return <p>Carregando usu�rios...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;

    return (
        <div>
            <h1>Gerenciamento de Usu�rios</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>A��es</th>
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
