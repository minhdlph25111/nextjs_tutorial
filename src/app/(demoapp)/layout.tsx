'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
    children: React.ReactNode;
}

interface MenuItem {
    id: number;
    label: string;
    path: string;
    icon?: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    const menuItems: MenuItem[] = [
        {
            id: 1,
            label: 'Home',
            path: '/home'
        }, {
            id: 2,
            label: 'Countries',
            path: '/countries'
        }, {
            id : 3,
            label : 'Calculator',
            path: '/calculator'
        },{
            id : 4,
            label : 'Settings',
            path: '/settings'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div
                className="sticky top-0 z-20 h-16 bg-blue-950 px-6"
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white text-xl font-bold mr-4 hover:opacity-80 cursor-pointer"
                >
                    -
                </button>

                <h1 className="text-white text-xl font-semibold flex-1 text-center">
                    Demo App
                </h1>

                <div className="items-center">

                </div>
            </div>

            <div className="flex">
                {sidebarOpen && (
                    <aside
                        className="w-64 bg-blue-900 text-white min-h-[calc(100vh-4rem)] sticky top-16 "
                        style={{width : '250px'}}
                    >
                        <nav className="p-4 space-y-1 gap-2 flex flex-col" >
                            {menuItems.map((item) => {
                                const isActive = pathname.startsWith(item.path);

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.path}
                                        className={`
                                            flex items-center gap-3 px-4 py-2 rounded-md transition
                                            ${isActive
                                            ? 'bg-blue-950'
                                            : 'hover:bg-blue-900'}
                                                `}
                                    >
                                        {item.icon}
                                        <span style={{ fontSize : "20px" }}>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>
                )}
                <main className="flex-1 p-2">
                    <div
                        className=" p-2 min-h-[calc(100vh-7rem)]"
                        style={{color : 'black'}}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
