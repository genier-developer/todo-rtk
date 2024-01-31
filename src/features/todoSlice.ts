import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v1} from 'uuid'

export type TodoType = {
    id: string,
    title: string,
    completed: boolean
}
export type TodosType = {
    todos: TodoType[],
    status: null | string,
    error: null | string,
}

// type StatusType = 'pending' | 'fullfilled' | 'rejected'

export const initialState: TodosType = {
    todos: [],
    status: null,
    error: null
}
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?&_limit=10')
            console.log(response)
            if(response){
                return await response.json()
            }
        }

        catch (error) {
            // rejectWithValue(error.message)
            // console.warn(error.message)

        }

    },
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.unshift({
                id: v1(),
                title: action.payload,
                completed: false
            });
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(fetchTodos.pending, (state) => {
                    state.status = 'pending'
                    state.error = null
                })
                .addCase(fetchTodos.fulfilled, (state, action) => {
                    // console.log(action)
                    state.status = 'fulfilled'
                    state.todos = action.payload
                })
                .addCase(fetchTodos.rejected, (state, action) => {
                    // console.log(action)
                    state.status = 'rejected'
                    state.error = "error"
                })

        },


});

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;