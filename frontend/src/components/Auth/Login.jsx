import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, FormWrapper, Title, Input, Button, Message, SwitchMessage } from '../../styles/Login.styles';
import api from '../../api/api'; // Certifique-se de importar a API corretamente

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState(null); // Para mostrar mensagens de erro ou sucesso
    const [isError, setIsError] = useState(false); // Para controlar o estado do erro
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', formData);
            console.log('Login realizado com sucesso:', response.data);
            login(response.data.token); 
            setMessage('Login realizado com sucesso');
            setIsError(false);
            navigate('/home');
        } catch (err) {
            setMessage(err.response?.data.message || 'Erro desconhecido');
            setIsError(true); 
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
