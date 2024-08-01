import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isVisible }) => {
    return (
        <aside
            className={`bg-gray-200 w-64 fixed h-full p-4 transition-transform duration-300 ease-in-out transform ${
                isVisible ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:relative md:block`}
        >
            <ul className="space-y-2">
                <li>
                    <Link 
                        to="/products/new" 
                        className="block p-2 text-blue-600 hover:bg-gray-300 rounded-md transition-colors duration-200"
                    >
                        Create Products
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/products" 
                        className="block p-2 text-blue-600 hover:bg-gray-300 rounded-md transition-colors duration-200"
                    >
                        View Products
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
