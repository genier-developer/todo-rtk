import {AnyAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';



export type TodoType = {
    id: string,
    title: string,
    completed: boolean,
    userId: number,
}
export type TodosType = {
    todos: TodoType[],
    status: null | string,
    error: null | string,
    loading: boolean,
    filter: 'all' | 'completed' | 'active',
}

export const initialState: TodosType = {
    todos: [],
    status: null,
    error: null,
    loading: false,
    filter: 'all'
}


export const fetchTodos = createAsyncThunk<TodoType[], undefined, { rejectValue: string }>(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://dummyjson.com/todos?limit=10');
    if (!response.ok) {
      return rejectWithValue('Server error');
    }
    const data = await response.json();
    return data.todos.map((todo: any) => ({
      id: todo.id.toString(),
      title: todo.todo,
      completed: todo.completed,
      userId: todo.userId,
    }));
  }
);


export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id, {rejectWithValue}) {
        const response = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            return rejectWithValue('Can\'t delete task. Server error.');
        }

        return id;
    }
);

export const toggleStatus = createAsyncThunk<TodoType, string, { rejectValue: string, state: { todos: TodosType } }>(
    'todos/toggleStatus',
    async (id, {rejectWithValue, getState}) => {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        if (todo) {
            const response = await fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });

            if (!response.ok) {
                return rejectWithValue('Can\'t toggle status. Server error.');
            }

            return {...todo, completed: !todo.completed}

        }

        return rejectWithValue('No such todo in the list')
    }
);

export const addNewTodo = createAsyncThunk<TodoType, string, { rejectValue: string }>(
  'todos/addNewTodo',
  async (title, { rejectWithValue }) => {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: title,
        completed: false,
        userId: 1,
      }),
    });

    if (!response.ok) {
      return rejectWithValue("Can't add task. Server error.");
    }

    return await response.json();
  }
);


const setError = (state: any) => {
    state.status = 'rejected'
    state.error = "error"
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<'all' | 'completed' | 'active'>) {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.rejected, setError)
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
                state.status = 'pending'
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.todos = action.payload
                state.loading = false
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
                state.error = null
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.todos.unshift(action.payload)
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
                if (toggledTodo) {
                    toggledTodo.completed = !toggledTodo.completed
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.loading = false
            })
    },
});

export const { setFilter } = todoSlice.actions;

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

export const todoReducer = todoSlice.reducer;