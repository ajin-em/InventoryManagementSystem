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
            <Sidebar isVisible={isSidebarVisible} />
            <div className="flex-1 flex flex-col">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-4 flex-1">
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
