import React, {useEffect, useState} from 'react';
import {fetchTodos, TodoType} from '../features/todoSlice';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from "./hooks";
import {addTodo} from "../features/todoSlice";
import {TodoList} from "../components/TodoList";
import {NewTodoForm} from "../components/NewTodoForm";

function App() {
    const [todo, setTodo] = useState<TodoType[]>([]);
    const [title, setTitle] = useState('');

    const {status, error} = useAppSelector(state => state.todos)

    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     axios
    //         .get('https://jsonplaceholder.typicode.com/todos?&_limit=10')
    //         .then((response) => {
    //             console.log(response.data)
    //             if (Array.isArray(response.data)) {
    //                 setTodo(response.data);
    //             } else {
    //                 console.error('Data is not an array:', response.data);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    const handleAction = () => {
        if (title.trim()!=='') {
            dispatch(addTodo(title));
            setTitle('');
        }
    }

    return (
        <div className='App'>
            <NewTodoForm
                value={title}
                updateText={setTitle}
                handleAction={handleAction}
            />
            {status==='pending' && <h2>Loading...</h2>}
            {error && <h2>Error occurred: {error}</h2>}
            <TodoList todos={todo} status={'status'} error={'no error'} />
        </div>
    );
}

export default App;