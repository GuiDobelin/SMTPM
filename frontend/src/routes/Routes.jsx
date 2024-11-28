import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Home from '../components/home/Home';
import { useAuth } from '../hooks/useAuth';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/home"
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/login'} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
