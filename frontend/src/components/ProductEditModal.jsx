import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductEditModal = ({ product, onClose, onProductUpdated }) => {
  const [productData, setProductData] = useState({ ...product });
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProductData({ ...product });
    setProductImage(null); // Reset the product image for edit
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('ProductID', productData.ProductID);
      formData.append('ProductCode', productData.ProductCode);
      formData.append('ProductName', productData.ProductName);
      if (productImage) {
        formData.append('ProductImage', productImage);
      }
      formData.append('IsFavourite', productData.IsFavourite);
      formData.append('HSNCode', productData.HSNCode);
      formData.append('variant', productData.variant);
      formData.append('subvariant', productData.subvariant);
      formData.append('stock', productData.stock);

      const response = await axios.put(
        `http://localhost:8000/api/products/${product.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onProductUpdated(response.data); // Notify parent component about the update
      navigate('/products'); // Redirect to the ProductList component
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Product Code</label>
            <input
              type="text"
              name="ProductCode"
              value={productData.ProductCode}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={productData.ProductName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Variant</label>
            <input
              type="text"
              name="variant"
              value={productData.variant}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Subvariant</label>
            <input
              type="text"
              name="subvariant"
              value={productData.subvariant}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
