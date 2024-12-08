import {useEffect, useState} from 'react';
import {addNewTodo, fetchTodos, setFilter} from '../features/todo-slice';
import {useAppDispatch, useAppSelector} from "./hooks";
import {TodoList} from "../components/todo-list";
import {TodoForm} from "../components/todo-form";
import Button from "@mui/material/Button";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';


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
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                        <AddTaskIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Planner
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <TodoForm
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
        </Box>
    );
}

export default App;