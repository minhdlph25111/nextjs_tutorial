'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
    onSubmit: (data: UserFormData) => void;
}

export interface UserFormData {
    id?: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    isActive: boolean;
}

const UserDialog: React.FC<UserDialogProps> = ({open, onOpenChange, user, onSubmit}) => {
    const [formStatus, setFormStatus] = useState<string>("");

    // Reset form khi mở dialog
    useEffect(() => {
        if (open) {
            setFormStatus(user?.isActive ? "active" : "active");
        }
    }, [open, user]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData: UserFormData = {
            id: user?.id,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            userName: formData.get("userName") as string,
            isActive: formStatus === "active"
        };

        onSubmit(userData);
        onOpenChange(false);
    };

    const handleStatusChange = (value: string) => {
        setFormStatus(value);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {user ? "Edit User" : "Add New User"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                defaultValue={user?.firstName || ""}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                defaultValue={user?.lastName || ""}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user?.email || ""}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="userName">Username</Label>
                            <Input
                                id="userName"
                                name="userName"
                                defaultValue={user?.userName || ""}
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
                            {user ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;