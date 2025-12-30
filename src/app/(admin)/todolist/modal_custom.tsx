'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface DataItemlist {
    id: number;
    title: string;
    content: string;
    status: boolean;
}

interface EditItemModalProps {
    open: boolean;
    item: DataItemlist | null;
    onClose: () => void;
    onSave: (item: DataItemlist) => void;
}

const ModalItemTodolist: React.FC<EditItemModalProps> = ({
                                                         open,
                                                         item,
                                                         onClose,
                                                         onSave,
                                                     }) => {

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit item</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        value={item.title}
                        placeholder="Title"
                        onChange={(e) =>
                            onSave({ ...item, title: e.target.value })
                        }
                    />

                    <Input
                        value={item.content}
                        placeholder="Content"
                        onChange={(e) =>
                            onSave({ ...item, content: e.target.value })
                        }
                    />
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onSave(item)}
                        disabled={!item.title.trim()}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalItemTodolist;
