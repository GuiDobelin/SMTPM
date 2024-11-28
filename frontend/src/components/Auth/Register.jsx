import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import {
    Container,
    FormWrapper,
    Title,
    Input,
    Button,
    Message,
    SwitchMessage
} from '../../styles/Register.styles';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/register', formData);
            setMessage('Registro efetuado com sucesso!');
            setIsError(false);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setMessage(err.response?.data.message || 'Erro desconhecido');
            setIsError(true);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Registrar</Title>
                {message && <Message error={isError}>{message}</Message>}
                <form onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        placeholder="Nome"
                        onChange={handleChange}
                        value={formData.name}
                    />
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
                    <Button type="submit">Registrar</Button>
                </form>
                <SwitchMessage>
                    Já tem uma conta? <Link to="/login">Faça login aqui</Link>.
                </SwitchMessage>
            </FormWrapper>
        </Container>
    );
};

export default Register;
