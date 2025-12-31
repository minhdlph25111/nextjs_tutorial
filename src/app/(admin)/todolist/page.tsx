'use client';
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
    setTodos,
    setSearchText,
    openEditModal,
    closeModal,
    updateTodo,
    removeTodo,
    toggleStatus,
    clearAll, addTodo, DataTodolist,
} from "@/redux/reducers/todolist.slice";
import { dataTodoList } from "@/datas/dataTodolist";
import ModalTodolist from "./modal_custom";
import { Search } from "lucide-react"; // Thay thế SearchOutlined từ antd
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TodoListPage = () => {
    const dispatch = useAppDispatch();
    const { list, searchText, selectedItem, isModalOpen } =
        useAppSelector((state) => state.todo);

    useEffect(() => {
        dispatch(setTodos(dataTodoList));
    }, [dispatch]);

    const filteredTodoList = useMemo(
        () =>
            list.filter((item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
            ),
        [list, searchText]
    );

    const handleSave = (item: DataTodolist) => {
        if (selectedItem) {
            dispatch(updateTodo(item));
        } else {
            dispatch(addTodo({
                ...item,
                id: Date.now(),
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-auto flex-1 max-w-2xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                className="pl-10 pr-4 py-2 w-full"
                                placeholder="Tìm kiếm công việc..."
                                value={searchText}
                                onChange={(e) => dispatch(setSearchText(e.target.value))}
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <Button
                                onClick={() => dispatch(openEditModal(null))}
                                className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
                            >
                                + Thêm mới
                            </Button>
                            <Button
                                onClick={() => dispatch(clearAll())}
                                variant="destructive"
                                className="flex-1 md:flex-none"
                                disabled={list.length === 0}
                            >
                                Xóa tất cả
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {filteredTodoList.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                                <div className="text-gray-400 mb-4">
                                    <Search className="h-12 w-12 mx-auto opacity-50" />
                                </div>
                                <p className="text-gray-500 text-lg font-medium">
                                    {searchText ? 'Không tìm thấy kết quả phù hợp' : 'Danh sách công việc trống'}
                                </p>
                            </div>
                        ) : (
                            filteredTodoList.map((item, idx: number) => (
                                <div
                                    key={item.id}
                                    className={`border rounded-xl p-5 transition-all duration-200 hover:shadow-md ${
                                        item.status
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-white border-gray-200'
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                    #{idx + 1}
                                                </span>
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                    item.status
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {item.status ? 'Đã hoàn thành' : 'Đang thực hiện'}
                                                </span>
                                            </div>

                                            <h3 className={`text-lg font-semibold mb-2 ${
                                                item.status ? 'text-gray-500 line-through' : 'text-gray-800'
                                            }`}>
                                                {item.title}
                                            </h3>

                                            <div className="mt-3">
                                                <p className="text-gray-600 text-sm font-medium mb-1">Nội dung:</p>
                                                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    {item.content || "Không có mô tả"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[180px]">
                                            <Button
                                                onClick={() => dispatch(toggleStatus(item.id))}
                                                variant={item.status ? "outline" : "default"}
                                                className={`w-full ${
                                                    item.status
                                                        ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                                        : 'bg-blue-600 hover:bg-blue-700'
                                                }`}
                                            >
                                                {item.status ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => dispatch(openEditModal(item))}
                                                    variant="outline"
                                                    className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                >
                                                    Sửa
                                                </Button>
                                                <Button
                                                    onClick={() => dispatch(removeTodo(item.id))}
                                                    variant="outline"
                                                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Modal */}
                <ModalTodolist
                    open={isModalOpen}
                    item={selectedItem}
                    onClose={() => dispatch(closeModal())}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
};

export default TodoListPage;