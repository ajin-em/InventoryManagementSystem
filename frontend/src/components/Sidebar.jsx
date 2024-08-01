import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className={`bg-gray-200 w-64 md:block h-full p-4 transition-transform duration-300`}>
            <ul>
                <li>
                    <Link to="/products/new" className="block p-2 text-blue-600 hover:bg-gray-300">Create Products</Link>
                </li>
                <li>
                    <Link to="/products" className="block p-2 text-blue-600 hover:bg-gray-300">View Products</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
