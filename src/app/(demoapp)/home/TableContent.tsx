'use client';
import React, {useMemo, useState} from "react";
import usersData from "@/datas/data";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Search, Pencil, Trash2} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

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
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<string>("");

    const filteredUsers = useMemo(() => {
        return usersData.filter((user: User) =>
            `${user.firstName} ${user.lastName} ${user.email} ${user.userName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setFormStatus(user.isActive ? "active" : "inactive");
        setIsDialogOpen(true);
    };

    const handleDialogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            userName: formData.get("userName") as string,
            isActive: formStatus === "active"
        };

        console.log("User data:", userData);
        console.log("Selected user ID:", selectedUser?.id);
        if (selectedUser) {
            console.log("Updating user:", selectedUser.id);
        } else {
            console.log("Creating new user");
        }

        setIsDialogOpen(false);
        setSelectedUser(null);
        setFormStatus("");
    };

    const handleDeleteClick = (user: User) => {
        if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
            usersData.filter((userItem: User) => user.id !== userItem.id);
            console.log("Deleting user:", user.id);
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setFormStatus("active");
        setIsDialogOpen(true);
    };

    const handleStatusChange = (value: string) => {
        setFormStatus(value);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Search and Add section */}
            <div className="flex items-center justify-between gap-4 mb-4 p-4 bg-white rounded-lg border">
                <div className="flex gap-2 flex-1 max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white z-10">
                            <TableRow>
                                <TableHead className="w-[80px]">STT</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-[180px]">Options</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user: User, index: number) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{index + 1}</TableCell>
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
                                                    className="h-8 px-3"
                                                >
                                                    <Pencil className="h-3.5 w-3.5 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(user)}
                                                    className="h-8 px-3"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-3 text-sm text-gray-500">
                                    Showing {filteredUsers.length} of {usersData.length} users
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedUser ? "Edit User" : "Add New User"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleDialogSubmit}>
                        <div className="grid gap-4 py-4 mb-4">
                            <div className="grid gap-3">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={selectedUser?.firstName || ""}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    defaultValue={selectedUser?.lastName || ""}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={selectedUser?.email || ""}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="userName">Username</Label>
                                <Input
                                    id="userName"
                                    name="userName"
                                    defaultValue={selectedUser?.userName || ""}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formStatus}
                                    onValueChange={handleStatusChange}
                                    name="status"
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {selectedUser ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default TableContent;