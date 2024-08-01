import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex h-screen">
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col ml-0 md:ml-64">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 flex-1 bg-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
