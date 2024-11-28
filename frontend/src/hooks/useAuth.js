import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log('Usuário logado:', user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token); 
                setUser(decodedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return { isAuthenticated, user, logout };
};
