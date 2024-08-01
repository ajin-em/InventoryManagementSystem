import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import '../utils/spinner.css';

const Navbar = ({ toggleSidebar }) => {
    const [username, setUsername] = useState('');
    const { signout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await axios.get('https://inventory-management-system-backend-nine.vercel.app/api/me/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUsername(response.data.username);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('access_token');
                    toast.error('Session expired. Redirecting to sign in...');
                    setTimeout(() => {
                        navigate('/signin');
                    }, 3000);
                }
            } else {
                navigate('/signin');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        signout(); // Clear the authentication state
        navigate('/signin'); // Navigate to the sign-in page
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex gap-4 justify-end items-center">
            <ToastContainer />
            <button
                className="text-white md:hidden"
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <div className="text-lg font-semibold">
                {username}
            </div>
            <button className="btn btn-logout" onClick={handleLogout}>Sign Out</button>
        </nav>
    );
};

export default Navbar;
