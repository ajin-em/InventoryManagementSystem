import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/DashBoard';
import PrivateRoute from './utils/PrivateRoute';
import SignInForm from './components/SigninForm.jsx'; 
import SignUpForm from './components/SignupForm.jsx';
import { AuthProvider } from './utils/AuthContext.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
                    <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
