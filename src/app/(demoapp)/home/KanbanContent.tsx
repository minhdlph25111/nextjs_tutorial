'use client';
import React, {useState} from "react";
import usersData from "@/datas/data";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Mail, User} from "lucide-react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
}

type ColumnType = {
    id: 'active' | 'inactive';
    title: string;
    color: string;
    badgeColor: string;
    users: User[];
};

const KanbanContent: React.FC = () => {

    const [columns, setColumns] = useState<ColumnType[]>(() => {
        const activeUsers = usersData.filter(user => user.isActive);
        const inactiveUsers = usersData.filter(user => !user.isActive);

        return [
            {
                id: 'active',
                title: 'Active',
                color: 'border-green-200 bg-green-50/50',
                badgeColor: 'bg-green-100 text-green-800 hover:bg-green-100',
                users: activeUsers
            },
            {
                id: 'inactive',
                title: 'Inactive',
                color: 'border-red-200 bg-red-50/50',
                badgeColor: 'bg-red-100 text-red-800 hover:bg-red-100',
                users: inactiveUsers
            }
        ];
    });

    const onDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result; //eslint-disable-line

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        setColumns(prevColumns => {
            const sourceColIndex = prevColumns.findIndex(
                col => col.id === source.droppableId
            );
            const destColIndex = prevColumns.findIndex(
                col => col.id === destination.droppableId
            );

            if (sourceColIndex === -1 || destColIndex === -1) return prevColumns;

            const sourceColumn = prevColumns[sourceColIndex];
            const destColumn = prevColumns[destColIndex];

            const sourceUsers = [...sourceColumn.users];
            const destUsers =
                sourceColIndex === destColIndex
                    ? sourceUsers
                    : [...destColumn.users];

            const [movedUser] = sourceUsers.splice(source.index, 1);

            const updatedUser = {
                ...movedUser,
                isActive: destColumn.id === "active",
            };

            destUsers.splice(destination.index, 0, updatedUser);

            const newColumns = [...prevColumns];
            newColumns[sourceColIndex] = {
                ...sourceColumn,
                users: sourceUsers,
            };
            newColumns[destColIndex] = {
                ...destColumn,
                users: destUsers,
            };

            return newColumns;
        });
    };

    const handleToggleStatus = (userId: string, currentColumnId: string) => {//eslint-disable-line
        const newColumns = [...columns];
        const currentColIndex = newColumns.findIndex(col => col.id === currentColumnId);
        const targetColId = currentColumnId === 'active' ? 'inactive' : 'active';
        const targetColIndex = newColumns.findIndex(col => col.id === targetColId);

        const userIndex = newColumns[currentColIndex].users.findIndex(u => u.id === userId);
        if (userIndex === -1) return;

        const [user] = newColumns[currentColIndex].users.splice(userIndex, 1);
        const updatedUser = {
            ...user,
            isActive: targetColId === 'active'
        };

        newColumns[targetColIndex].users.push(updatedUser);
        setColumns(newColumns);
    };

    return (
        <div className="p-6 space-y-6">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid gap-6 md:grid-cols-2">
                    {columns.map(column => (
                        <div key={column.id} className="space-y-4">
                            <Card className={column.color}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg">{column.title}</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4 pt-0">
                                    <Droppable droppableId={column.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={`space-y-3 min-h-[600px] rounded-lg p-2 ${
                                                    snapshot.isDraggingOver ? 'bg-black/5' : ''
                                                }`}
                                            >
                                                {column.users.map((user, index) => (
                                                    <Draggable
                                                        key={user.id}
                                                        draggableId={user.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <Card
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`cursor-pointer transition-all
                                                                 ${user.isActive 
                                                                    ? `border-green-500`
                                                                    : `border-red-500`
                                                                  }
                                                                 ${
                                                                    snapshot.isDragging
                                                                        ? 'rotate-1 shadow-lg border-primary'
                                                                        : 'hover:shadow-md'
                                                                }`}
                                                            >
                                                                <CardHeader className="pb-2">
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                            <div
                                                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                                                <User className="h-5 w-5 text-primary"/>
                                                                            </div>
                                                                            <div>
                                                                                <CardTitle className="text-base">
                                                                                    {user.firstName} {user.lastName}
                                                                                </CardTitle>
                                                                                <CardDescription
                                                                                    className="flex items-center gap-1">
                                                                                    @{user.userName}
                                                                                </CardDescription>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>

                                                                <CardContent className="pb-3">
                                                                    <div className="space-y-2">
                                                                        <div
                                                                            className="flex items-center gap-2 text-sm">
                                                                            <Mail
                                                                                className="h-4 w-4 text-muted-foreground"/>
                                                                            <span
                                                                                className="text-muted-foreground">{user.email}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        className="flex items-center justify-between mt-4">
                                                                        <Badge
                                                                            variant={user.isActive ? "default" : "secondary"}
                                                                            className={user.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}
                                                                        >
                                                                            {user.isActive ? 'Active' : 'Inactive'}
                                                                        </Badge>
                                                                        <div className="text-xs text-muted-foreground">
                                                                            ID: {user.id.slice(0, 8)}...
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}

                                                {column.users.length === 0 && (
                                                    <div
                                                        className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed rounded-lg border-muted">
                                                        <p className="text-sm text-muted-foreground">No users in this
                                                            column</p>
                                                        <p className="text-xs text-muted-foreground">Drag users here</p>
                                                        <p className="text-xs text-muted-foreground">HIHI</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Droppable>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanContent;