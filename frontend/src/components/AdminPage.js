import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = sessionStorage.getItem('token'); // Get the token from session storage
                // console.log("Token:", token); 

                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the Authorization header
                    },
                });

                console.log("Fetched User Data:", data); // Log the fetched user data
                setUsers(data.data); // Assume the data contains a `data` array with user details
            } catch (error) {
                console.error('Error fetching users:', error); // Log the entire error object
                console.error('Access denied or failed to load users:', error.response?.data);
            }
        };

        fetchUsers();
    }, []);

    const deleteButton = () => {

        sessionStorage.removeItem('token')
        navigate('/login-admin')

    }

    return (
        <div className="p-6 w-[60%] mx-auto">
            <div className='flex items-center justify-between'>
                <h1 className="text-3xl mb-8">Admin Dashboard</h1>
                <button className='px-4 py-2 bg-sky-700 rounded-md' onClick={deleteButton}>Logout</button>
            </div>
            <ul className="mt-4 space-y-2">
                {users.map((user) => (
                    <li key={user._id} className="border p-2 rounded">
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
