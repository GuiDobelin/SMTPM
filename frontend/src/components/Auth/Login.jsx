import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, FormWrapper, Title, Input, Button, Message, SwitchMessage } from '../../styles/Login.styles';
import api from '../../api/api'; 

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState(null); 
    const [isError, setIsError] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', formData);
            console.log('Resposta da API:', response.data);
    
            const { user, token } = response.data;
            login(user, token);
            navigate('/home');
        } catch (err) {
            console.error('Erro ao fazer login:', err.response?.data.message);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                {message && <Message error={isError}>{message}</Message>}
                <form onSubmit={handleSubmit}>
                    <Input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <Button type="submit">Entrar</Button>
                </form>
                <SwitchMessage>
                    Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>.
                </SwitchMessage>
            </FormWrapper>
        </Container>
    );
};

export default Login;
