import React, {useEffect, useState} from 'react';
import {TodoType} from '../types/data';
import {v1} from 'uuid';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    AppContainer,
    InputContainer,
    StyledTextField,
    TodoList,
    TodoItem,
    DeleteIconContainer
} from '../styles/styles';
import {TextField} from "@mui/material";

function App() {
    const [todo, setTodo] = useState<TodoType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/todos?&_limit=10')
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    setTodo(response.data);
                } else {
                    console.error('Data is not an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const addTodo = () => {
        if (title.trim() !== '') {
            setTodo([
                {
                    id: v1(),
                    title: title,
                    isCompleted: false,
                },
                ...todo,
            ]);
        }
        setTitle('');
    };

    const deleteTodo = (id: string) => {
        const todos = todo.filter((t) => t.id !== id);
        setTodo(todos);
    };

    const toggleTodo = (id: string)=> {
        // console.log('toggled')
        setTodo((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                    };
                }
                return todo;
            });
        });

    }

    return (
        <AppContainer>
            <InputContainer>
                <StyledTextField id="outlined-basic" value={title} size={'small'} variant="outlined"
                                 label={'Enter task title'} onChange={(e) => setTitle(e.target.value)}/>
                <Button variant="contained" onClick={addTodo}>
                    Add
                </Button>
            </InputContainer>

            <TodoList>
                {todo.map((t) => (
                    <TodoItem key={t.id}>
                        <Checkbox checked={t.isCompleted} onChange={()=>toggleTodo(t.id)}/>

                        <StyledTextField>{t.title}</StyledTextField>
                        <DeleteIconContainer onClick={() => deleteTodo(t.id)}>
                            <DeleteIcon/>
                        </DeleteIconContainer>
                    </TodoItem>
                ))}
            </TodoList>
        </AppContainer>
    );
}

export default App;
