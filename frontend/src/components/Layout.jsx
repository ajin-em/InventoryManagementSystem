import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Start hidden on mobile

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isVisible={isSidebarVisible} />

            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 flex-1 bg-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
