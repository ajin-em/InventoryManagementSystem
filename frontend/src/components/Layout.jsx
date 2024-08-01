import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Start as hidden on mobile

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex h-screen">
            <Sidebar isVisible={isSidebarVisible} />

            <div className="flex-1 flex flex-col">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 flex-1 bg-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
