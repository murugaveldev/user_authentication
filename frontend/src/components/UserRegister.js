import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        console.log({ username, email, password, role });

        try {
            const register = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/register`, { username, email, password, role });
            if (register.status === 200) { // Check for 201 Created status
                alert("User registered successfully!");
                navigate('/login-user');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data) {
                alert(`Registration failed: ${error.response.data.message}`);
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handlesubmit} className="p-6 bg-white rounded-lg shadow-md w-[50%] mx-auto">
                <h2 className="text-2xl mb-4">User Register</h2>

                <input
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Enter Your Username"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Enter Your Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Enter Your Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register User</button>
            </form>
        </div>
    );
};

export default UserRegister;
