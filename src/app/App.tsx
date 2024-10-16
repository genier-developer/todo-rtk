import {useEffect, useState} from 'react';
import {addNewTodo, fetchTodos, setFilter} from '../features/todoSlice';
import {useAppDispatch, useAppSelector} from "./hooks";
import {TodoList} from "../components/TodoList";
import {NewTodoForm} from "../components/NewTodoForm";
import {AppContainer} from '../styles/styles';
import Button from "@mui/material/Button";


function App() {
    const [title, setTitle] = useState('');
    const error = useAppSelector(state => state.todos.error)
    const loading = useAppSelector(state => state.todos.loading)
    const todos = useAppSelector(state => state.todos.todos);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    const activeTodoCount = todos.filter(todo => !todo.completed).length;

    const handleAction = () => {
        if (title.trim() !== '') {
            dispatch(addNewTodo(title));
        }
        setTitle('');
    }
    const handleAll = () => {
        dispatch(setFilter('all'));
    };

    const handleActive = () => {
        dispatch(setFilter('active'));
    };

    const handleCompleted = () => {
        dispatch(setFilter('completed'));
    };

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
            <div>
                <p>{activeTodoCount} items left</p>
                <Button variant="contained"
                        sx={{margin: 2}}
                        color={'primary'}
                        onClick={handleAll}>
                    All
                </Button>
                <Button variant="contained"
                        sx={{margin: 2}}
                        color={'success'}
                        onClick={handleActive}>
                    Active
                </Button>
                <Button variant="contained"
                        sx={{margin: 2}}
                        color={'warning'}
                        onClick={handleCompleted}>
                    Completed
                </Button>
            </div>
        </AppContainer>
    );
}

export default App;