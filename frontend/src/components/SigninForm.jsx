import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../utils/spinner.css'

const SigninForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('https://inventory-management-system-backend-nine.vercel.app/api/signin/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            toast.success('Signin successful! Redirecting...');
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard');
            }, 2000); 
        } catch (error) {
            setErrors(error.response?.data || {});
            toast.error('Signin failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
            {isLoading && <div className="flex justify-center items-center mb-4"><div className="spinner"></div></div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        placeholder="Username" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
                </div>
                <div className="mb-4">
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SigninForm;
