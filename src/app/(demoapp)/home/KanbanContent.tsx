'use client';
import React, {useState} from "react";
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

const KanbanContent: React.FC = () => {
    const [users, setUsers] = useState<User[]>(usersData);

    return (
        <>
        </>
    )
};

export default KanbanContent;