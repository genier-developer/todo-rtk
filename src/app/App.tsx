import {useEffect, useState} from 'react';
import {addNewTodo, fetchTodos, setFilter} from '../features/todoSlice';
import {useAppDispatch, useAppSelector} from "./hooks";
import {TodoList} from "../components/TodoList";
import {NewTodoForm} from "../components/NewTodoForm";
import {AppContainer} from '../styles/styles';
import Button from "@mui/material/Button";


function App() {
    const [todo, setTodo] = useState('');
    const error = useAppSelector(state => state.todos.error)
    const loading = useAppSelector(state => state.todos.loading)
    const todos = useAppSelector(state => state.todos.todos);
    const filter = useAppSelector(state => state.todos.filter);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    const activeTodoCount = todos.filter(todo => !todo.completed).length;

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return false;
    });

    const handleAction = () => {
        if (todo.trim() !== '') {
            dispatch(addNewTodo(todo));
        }
        setTodo('');
    };

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
                value={todo}
                updateText={setTodo}
                handleAction={handleAction}
            />
            {loading && <h2>Loading...</h2>}
            {error && <h2>Error occurred: {error}</h2>}
            <TodoList todos={filteredTodos} />
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