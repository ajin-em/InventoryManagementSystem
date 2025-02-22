import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../utils/spinner.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
        if (formData.password !== formData.password2) newErrors.password2 = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error('Please correct the highlighted errors.');
            return;
        }

        setIsLoading(true);

        try {
            await axios.post('https://inventory-management-system-backend-nine.vercel.app/api/signup/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password2: formData.password2
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            toast.success('Signup successful! Redirecting...');
            
            setTimeout(() => {
                setIsLoading(false);
                navigate('/signin');
                console.log('Navigating to /signin');
            }, 2000);
        } catch (error) {
            console.error('Signup error:', error);
            setErrors(error.response?.data || { non_field_errors: 'An unexpected error occurred' });
            toast.error('Signup failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
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
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
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
                </div>
                <div className="mb-4">
                    <input 
                        type="password" 
                        name="password2" 
                        value={formData.password2} 
                        onChange={handleChange} 
                        placeholder="Confirm Password" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.password2 && <div className="text-red-500 text-sm mt-1">{errors.password2}</div>}
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
            <div className="mt-4 text-center">
                Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
            </div>
        </div>
    );
};

export default SignupForm;
