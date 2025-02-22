import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductEditModal from './ProductEditModal';
import Layout from './Layout';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://inventory-management-system-backend-nine.vercel.app/api/products/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        toast.error('Error fetching products.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`https://inventory-management-system-backend-nine.vercel.app/api/products/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== productId));
      toast.success('Product deleted successfully.');
    } catch (error) {
      toast.error('Error deleting product.');
      console.error('Error deleting product:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleProductUpdated = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('https://inventory-management-system-backend-nine.vercel.app/api/products/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      toast.success('Product updated successfully.');
    } catch (error) {
      toast.error('Error fetching products.');
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
        {loading ? (
          <div className="text-center">Loading products...</div> 
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-md">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">ID</th>
                  <th className="border-b px-4 py-2 text-left">Product Code</th>
                  <th className="border-b px-4 py-2 text-left">Product Name</th>
                  <th className="border-b px-4 py-2 text-left">Variant</th>
                  <th className="border-b px-4 py-2 text-left">Subvariant</th>
                  <th className="border-b px-4 py-2 text-left">Stock</th>
                  <th className="border-b px-4 py-2 text-left">Image</th>
                  <th className="border-b px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="border-b px-4 py-2 text-sm md:text-base">{product.ProductID}</td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">{product.ProductCode}</td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">{product.ProductName}</td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">{product.variant}</td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">{product.subvariant}</td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">{product.stock}</td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">
                      <img
                        src={product.ProductImage}
                        alt={product.ProductName}
                        className="w-20 h-20 object-cover"
                        onError={(e) => (e.target.src = 'product.ProductImage')} 
                      />
                    </td>
                    <td className="border-b px-4 py-2 text-sm md:text-base">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showModal && (
          <ProductEditModal
            product={selectedProduct}
            onClose={handleModalClose}
            onProductUpdated={handleProductUpdated}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProductList;
