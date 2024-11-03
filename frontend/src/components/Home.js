import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
            <p className="text-lg mb-8">Please log in as a user or admin to access the dashboard.</p>
            <div className="flex space-x-4">
                <Link to="/user-register" className="bg-blue-500 text-white py-2 px-4 rounded">
                    User Register
                </Link>
                <Link to="/login-admin" className="bg-green-500 text-white py-2 px-4 rounded">
                    Admin Login
                </Link>
            </div>
            <div className='mt-4 flex items-center'>
                <Link to="/login-user" className="">
                    <p className='text-[12px] font-semibold text-blue-700'>Do You Have Account! Login</p>
                </Link>
            </div>
            <Link to='/admin'>
                click
            </Link>
        </div>
    );
};

export default Home;
