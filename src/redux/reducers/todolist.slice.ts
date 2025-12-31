import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataTodolist {
    id: number;
    title: string;
    content: string;
    status: boolean;
}

interface TodoState {
    list: DataTodolist[];
    selectedItem: DataTodolist | null;
    searchText: string;
    isModalOpen: boolean;
}

const initialState: TodoState = {
    list: [],
    selectedItem: null,
    searchText: "",
    isModalOpen: false,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<DataTodolist[]>) {
            state.list = action.payload;
        },

        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },

        openEditModal(state, action: PayloadAction<DataTodolist | null>) {
            state.selectedItem = action.payload;
            state.isModalOpen = true;
        },

        closeModal(state) {
            state.selectedItem = null;
            state.isModalOpen = false;
        },

        addTodo(state, action: PayloadAction<DataTodolist>) {
            state.list = [action.payload, ...state.list];
        },

        updateTodo(state, action: PayloadAction<DataTodolist>) {
            state.list = state.list.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        },

        removeTodo(state, action: PayloadAction<number>) {
            state.list = state.list.filter(
                (item) => item.id !== action.payload
            );
        },

        toggleStatus(state, action: PayloadAction<number>) {
            const todo = state.list.find(
                (item) => item.id === action.payload
            );
            if (todo) todo.status = !todo.status;
        },

        clearAll(state) {
            state.list = [];
        },
    },
});

export const {
    setTodos,
    setSearchText,
    openEditModal,
    closeModal,
    addTodo,
    updateTodo,
    removeTodo,
    toggleStatus,
    clearAll,
} = todoSlice.actions;

export default todoSlice.reducer;