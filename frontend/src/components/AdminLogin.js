import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, { email, password });

            // Store token in session storage
            sessionStorage.setItem('token', data.token);

            // Check user role
            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                alert('Access denied: Admins only');
            }
        } catch (error) {
            console.error('Admin login failed:', error.response?.data?.message);
            alert('Login failed: ' + error.response?.data?.message || 'Unknown error');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl mb-4">Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 mb-4 w-full border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 mb-4 w-full border rounded"
                />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Login as Admin</button>
            </form>
        </div>
    );
};

export default AdminLogin;
