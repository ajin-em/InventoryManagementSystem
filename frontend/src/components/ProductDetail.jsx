import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/products/${id}/`);
                toast.success('Product deleted successfully');
                navigate('/products');
            } catch {
                toast.error('Failed to delete product');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold">{product.ProductName}</h1>
            <img src={product.ProductImage} alt={product.ProductName} className="w-32" />
            <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
                Delete Product
            </button>
        </div>
    );
};

export default ProductDetail;
