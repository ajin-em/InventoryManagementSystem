import React, { useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddStock = () => {
    const { id } = useParams(); // Get the sub-variant ID from URL parameters
    const [stockAmount, setStockAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddStock = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await axios.patch(`http://localhost:8000/api/subvariants/add-stock/${id}/`, { stock: stockAmount });
            toast.success('Stock added successfully!');
            setStockAmount('');
        } catch (error) {
            toast.error('Error adding stock');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Stock</h1>
            <form onSubmit={handleAddStock} className="flex flex-col max-w-sm mx-auto">
                <input
                    type="number"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(e.target.value)}
                    placeholder="Amount to add"
                    className="border p-2 mb-4"
                    min="0"
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Stock'}
                </button>
            </form>
        </div>
    );
};

export default AddStock;
