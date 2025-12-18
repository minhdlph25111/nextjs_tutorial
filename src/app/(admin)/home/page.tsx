"use client";

import React, {useMemo, useState} from "react";
import usersData from "@/datas/data";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
}

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = useMemo(() => {
        return usersData.filter((user: User) =>
            `${user.firstName} ${user.lastName} ${user.email} ${user.userName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">
                Home Component
            </h1>
            <div className="flex items-center flex-col gap-4">
                <h2 className="text-xl font-semibold text-center">
                    User List
                </h2>
                <div className="flex items-center gap-3 justify-between">
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                             px-3 py-2  rounded-md text-sm border
                             focus:outline-none "
                    />

                    <button
                        className="
                            cursor-pointer
                            bg-emerald-600 text-white px-4 py-2 rounded-md
                            hover:bg-emerald-700 transition"
                    >
                        Add Account
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto bg-white shadow">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-center text-sm font-semibold border">
                            #
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold border">
                            Name
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold border">
                            Email
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold border">
                            Username
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold border">
                            Status
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user: User, index: number) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2 text-center border">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-2 text-center border">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="px-4 py-2 text-center border">
                                    {user.email}
                                </td>
                                <td className="px-4 py-2 text-center border">
                                    {user.userName}
                                </td>
                                <td className="px-4 py-2 text-center border">
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium
                        ${
                            user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center py-6 text-gray-500"
                            >
                                No users found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePage;
