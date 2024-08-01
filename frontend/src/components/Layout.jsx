import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {

    const toggleSidebar = () => {
        
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
