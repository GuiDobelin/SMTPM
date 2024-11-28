import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Home from '../components/home/Home';
import Users from '../components/admin/UsersManagement';
import EditUser from '../components/admin/UpdateUser'
import { useAuth } from '../hooks/useAuth';

const AppRoutes = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                
                {user?.role === 'admin' && (
                    <>
                        <Route path="/users" element={<Users />} />
                        <Route path="/edit-user/:userId" element={<EditUser />} /> {/* Nova rota */}
                    </>
                )}

                <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/login'} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
