'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
    const [formData, setFormData] = useState<DataItemlist>({
        id: 0,
        title: "",
        content: "",
        status: false,
    });

    useEffect(() => {
        if (item) {
            setFormData(item); // eslint-disable-line
        } else {
            setFormData({
                id: Date.now(),
                title: "",
                content: "",
                status: false,
            });
        }
    }, [item, open]);

    const handleSubmit = () => {
        if (formData.title.trim()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {item ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Tiêu đề *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            placeholder="Nhập tiêu đề..."
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Nội dung</Label>
                        <Input
                            id="content"
                            value={formData.content}
                            placeholder="Nhập nội dung..."
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    content: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formData.title.trim()}
                    >
                        {item ? "Lưu thay đổi" : "Thêm mới"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalItemTodolist;