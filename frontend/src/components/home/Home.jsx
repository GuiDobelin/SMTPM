import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, LogoutButton } from '../../styles/Home.styles';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    return (
        <Container>
            <Title>Bem-vindo à Home!</Title>
            <p>Essa é a tela inicial, onde futuramente adicionaremos outras funcionalidades.</p>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Container>
    );
};

export default Home;
