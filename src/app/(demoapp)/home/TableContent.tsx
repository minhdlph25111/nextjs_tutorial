'use client';
import React, {useMemo, useState} from "react";
import usersData from "@/datas/data";
import {Input} from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Search, Pencil, Trash2} from "lucide-react";
import UserDialog, {UserFormData} from "@/app/(demoapp)/home/modal-custom";
import PaginationCustom from "@/app/(demoapp)/home/pagination-custom";
import {Button} from "@/components/ui/button";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
}

const TableContent: React.FC = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [users, setUsers] = useState<User[]>(usersData);

    // PaginationCustom state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Filter users based on search term
    const filteredUsers = useMemo(() => {
        return users.filter((user: User) =>
            `${user.firstName} ${user.lastName} ${user.email} ${user.userName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, users]);

    // Calculate pagination data
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get current page users
    const currentUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, currentPage, itemsPerPage]);

    // Handlers
    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleDialogSubmit = (formData: UserFormData) => {
        const userData: User = {
            id: formData.id || `user-${Date.now()}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            userName: formData.userName,
            password: selectedUser?.password || "default123",
            isActive: formData.isActive
        };

        if (selectedUser) {
            // Update user
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === selectedUser.id ? userData : user
                )
            );
        } else {
            // Add new user
            setUsers(prevUsers => [...prevUsers, userData]);
        }

        setSelectedUser(null);
    };

    const handleDeleteClick = (user: User) => {
        if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
            setUsers(prevUsers => prevUsers.filter(userItem => user.id !== userItem.id));
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsDialogOpen(true);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Search and Add section */}
            <div className="flex items-center justify-between gap-4 mb-4 p-4 bg-white rounded-lg border">
                <div className="flex gap-2 flex-1 max-w-md">
                    <div className="relative flex gap-2 flex-1 items-center">
                        <Search className="left-3 items-center flextext-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10"
                        />
                    </div>
                </div>
                <Button
                    onClick={handleAddUser}
                    className="bg-emerald-600 hover:bg-emerald-700 transition whitespace-nowrap"
                >
                    Add Account
                </Button>
            </div>

            {/* Table section */}
            <div className="flex-1 overflow-hidden flex flex-col">
                {/* Table content */}
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white z-10">
                            <TableRow >
                                <TableHead className="w-[80px] font-bold">STT</TableHead>
                                <TableHead className='font-bold'>Name</TableHead>
                                <TableHead className='font-bold'>Email</TableHead>
                                <TableHead className='font-bold'>Username</TableHead>
                                <TableHead className="w-[100px] font-bold">Status</TableHead>
                                <TableHead className="w-[180px] font-bold">Options</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user: User, index: number) => {
                                    const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                                    return (
                                        <TableRow key={user.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium">{globalIndex}</TableCell>
                                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.userName}</TableCell>
                                            <TableCell>
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                    user.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-600"
                                                }`}>
                                                    {user.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditClick(user)}
                                                        className="h-8 px-3 text-green-600 bg-green-100 hover:bg-green-200 hover:text-green-600"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(user)}
                                                        className="h-8 px-3 hover:text-red-600 hover:bg-red-200 bg-red-100 text-red-600 "
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* PaginationCustom component */}
                <PaginationCustom
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    className="sticky bottom-0"
                />
            </div>

            {/* Dialog component */}
            <UserDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                user={selectedUser}
                onSubmit={handleDialogSubmit}
            />
        </div>
    );
};

export default TableContent;