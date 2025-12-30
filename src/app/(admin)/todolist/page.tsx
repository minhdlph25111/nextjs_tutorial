'use client'
import React, {useMemo, useState} from "react";
import {dataTodoList} from "@/datas/dataTodolist";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {SearchOutlined} from "@ant-design/icons";
import ModalTodolist from "@/app/(admin)/todolist/modal_custom";

interface DataTodolist {
    id: number;
    title: string;
    content: string;
    status: boolean;
}

const TodoListPage: React.FC = () => {

    const [todoList, setTodoList] = useState<DataTodolist[]>(dataTodoList);
    const [searchText, setSearchText] = useState<string>("");
    const [itemSelected, setItemSelected] = useState<DataTodolist | null >(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const filteredTodoList = useMemo(() =>
            todoList.filter((todoListItem: DataTodolist) =>
                todoListItem.title.toLowerCase().includes(searchText.toLowerCase()))
        , [todoList, searchText]);

    const onRemove = (item: DataTodolist) => {
        const confirm = window.confirm(`Are you sure you want to remove this item ${item?.title}?`);
        if (confirm) {
            const dataRemoved = todoList.filter(
                (itemRemoved: DataTodolist) => item.id !== itemRemoved.id
            );
            setTodoList(dataRemoved);
            alert(`Đã xóa item ${item.title}`);
        }else {
            return;
        }
    };

    const onChangeStatus = (item : DataTodolist)=> {
        const confirm = window.confirm("Are you sure you want to update this item?");
        if(confirm){
            const dataChangeStatus = todoList.map((itemDataChangeStatus) =>
                item.id === itemDataChangeStatus.id ? { ...itemDataChangeStatus, status : !item.status } : itemDataChangeStatus
            );
            setTodoList(dataChangeStatus);
            alert("Successfully updated the item");
        }
    };

    const onEdit = (item : DataTodolist) => {
        setItemSelected(item);
        setOpenDialog(true);
    };

    const onUpdate = () => {
        if (!itemSelected) return;
        const dataUpdate = todoList.map(
            (item: DataTodolist) => item.id === itemSelected.id ? itemSelected : item
        );
        setTodoList(dataUpdate);
        closeModal();
    };

    const closeModal = () => {
        setOpenDialog(false);
        setItemSelected(null);
    };



    return (
        <div className='bg-white shadow-lg p-4 md:p-6 flex flex-col gap-4 justify-center m-auto items-center w-2xl'>
            <div
                className='flex items-center justify-center w-full gap-2 rounded-lg border border-gray-200 p-2 container'>
                <SearchOutlined/>
                <Input
                    className='text-black flex justify-center items-center p-4 w-full pl-10'
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder='Search...'
                />
                <Button
                    onClick={() => setTodoList([])}
                >
                    Clear All
                </Button>
            </div>
            <Button
                className='bg-green-700 text-white hover:bg-green-800'
            >
                Add New Item
            </Button>
            {
                filteredTodoList.map((item: DataTodolist, idx: number) =>
                    <div className=" container border p-4 rounded-lg bg-gray-200" key={item.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-gray-500 text-sm">STT: {idx + 1}</span>
                                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => onEdit(item)}
                                    className="h-8 px-3 text-blue-600 bg-blue-100 hover:bg-blue-200"
                                >
                                    Sửa
                                </Button>
                                <Button
                                    onClick={() => onRemove(item)}
                                    className="h-8 px-3 text-red-600 bg-red-100 hover:bg-red-200"
                                >
                                    Xóa
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <span className="font-medium">Nội dung:</span>
                                <p className="text-gray-600 mt-1">{item.content}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Trạng thái:</span>
                                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                                        item.status
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-600'
                                    }`}>
                              {item.status ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                            </span>
                                </div>

                                <Button
                                    onClick={()=>onChangeStatus(item)}
                                    className={`h-8 px-3 ${
                                        item.status
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-400 hover:text-gray-200'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                                >
                                    {item.status ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            <ModalTodolist
                open={openDialog}
                item={itemSelected}
                onClose={closeModal}
                onSave={onUpdate}
            />
        </div>
    )
};
export default TodoListPage;