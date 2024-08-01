import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex h-screen">
            {/* Conditionally render sidebar based on `isSidebarVisible` */}
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                <Sidebar />
            </div>

            <div className={`flex-1 flex flex-col ml-0 ${isSidebarVisible ? 'md:ml-64' : ''}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 flex-1 bg-gray-100">
                    {/* Content goes here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
