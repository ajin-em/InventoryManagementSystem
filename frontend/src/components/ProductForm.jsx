import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [productID, setProductID] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [hsnCode, setHsnCode] = useState('');
  const [variant, setVariant] = useState('');
  const [subvariant, setSubvariant] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('ProductID', productID);
    formData.append('ProductCode', productCode);
    formData.append('ProductName', productName);
    if (productImage) {
      formData.append('ProductImage', productImage);
    }
    formData.append('IsFavourite', isFavourite);
    formData.append('HSNCode', hsnCode);
    formData.append('variant', variant);
    formData.append('subvariant', subvariant);
    formData.append('stock', stock);

    try {
      const response = await axios.post('http://localhost:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      console.log('Product created successfully:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product ID</label>
          <input
            type="number"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product Code</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="w-full text-gray-700 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isFavourite}
            onChange={(e) => setIsFavourite(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Is Favourite</label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">HSN Code</label>
          <input
            type="text"
            value={hsnCode}
            onChange={(e) => setHsnCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Variant</label>
          <input
            type="text"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Subvariant</label>
          <input
            type="text"
            value={subvariant}
            onChange={(e) => setSubvariant(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
