import React, {useEffect, useState} from 'react';
import {addNewTodo, fetchTodos} from '../features/todoSlice';
import {useAppDispatch, useAppSelector} from "./hooks";
import {TodoList} from "../components/TodoList";
import {NewTodoForm} from "../components/NewTodoForm";
import {AppContainer} from '../styles/styles';


function App() {
    const [title, setTitle] = useState('');
    // const status = useAppSelector(state => state.todos.status)
    const error = useAppSelector(state => state.todos.error)
    const loading = useAppSelector(state => state.todos.loading)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    const handleAction = () => {
        if (title.trim() !== '') {
            dispatch(addNewTodo(title));
        }
        setTitle('');
    }

    return (
        <AppContainer>
            <NewTodoForm
                value={title}
                updateText={setTitle}
                handleAction={handleAction}
            />
            {loading && <h2>Loading...</h2>}
            {error && <h2>Error occurred: {error}</h2>}
            <TodoList/>
        </AppContainer>
    );
}

export default App;