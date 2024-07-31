import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/DashBoard';
import PrivateRoute from './utils/PrivateRoute';
import AuthSwitcher from './utils/AuthSwitcher';
import { AuthProvider } from './utils/AuthContext.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<AuthSwitcher />} />
                    <Route path="/signin" element={<AuthSwitcher />} />
                    <Route path="/signup" element={<AuthSwitcher />} />

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
