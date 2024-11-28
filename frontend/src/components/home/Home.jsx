import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, LogoutButton, AdminMenu } from '../../styles/Home.styles'; 
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
    const { user, logout } = useAuth();
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    return (
        <Container>
            <Title>Bem-vindo a Home!</Title>
            <p>Essa e a tela inicial, onde futuramente adicionaremos outras funcionalidades.</p>
            {user?.role === 'admin' && (
                <AdminMenu>
                    <ul>
                        <li>
                            <button onClick={() => navigate('/users')}>Mostrar Todos os Usuarios</button>
                        </li>
                    </ul>
                </AdminMenu>
            )}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Container>
    );
};

export default Home;
