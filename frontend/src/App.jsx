import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import AddStock from './components/AddStock';
import RemoveStock from './components/RemoveStock';
import Dashboard from './components/DashBoard';
import PrivateRoute from './utils/PrivateRoute';
import AuthSwitcher from './utils/AuthSwitcher';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<AuthSwitcher />} />
                <Route path="/signin" element={<AuthSwitcher />} />
                <Route path="/signup" element={<AuthSwitcher />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dashboard />} />}
                />
                <Route
                    path="/products"
                    element={<PrivateRoute element={<ProductList />} />}
                />
                <Route
                    path="/products/new"
                    element={<PrivateRoute element={<ProductForm />} />}
                />
                <Route
                    path="/products/:id"
                    element={<PrivateRoute element={<ProductDetail />} />}
                />
                <Route
                    path="/products/:id/add-stock"
                    element={<PrivateRoute element={<AddStock />} />}
                />
                <Route
                    path="/products/:id/remove-stock"
                    element={<PrivateRoute element={<RemoveStock />} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
