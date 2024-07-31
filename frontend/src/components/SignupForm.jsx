import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const SignupForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });
    const [errors, setErrors] = useState({});
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
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/signup/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password2: formData.password2
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            navigate('/signin'); // Redirect on successful signup
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data); // Update errors from server response
            } else {
                setErrors({ non_field_errors: 'An unexpected error occurred' }); // Generic error message
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
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
                
                {errors.non_field_errors && <div className="text-red-500 text-sm mt-4 text-center">{errors.non_field_errors}</div>}
            </form>
        </div>
    );
};

export default SignupForm;
