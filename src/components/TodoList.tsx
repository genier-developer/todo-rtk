import {useAppDispatch, useAppSelector} from '../app/hooks';
import {TodoItem} from './TodoItem';
import {TodoLists} from '../styles/styles'
import {toggleStatus} from "../features/todoSlice";

export const TodoList = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const filter = useAppSelector(state => state.todos.filter);
    const dispatch = useAppDispatch();

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
    });

    const handleToggle = (id: string) => {
        dispatch(toggleStatus(id));  // Вызываем экшен для смены статуса задачи
    };

    return (
        <ul style={{listStyleType: 'none'}}>
            {filteredTodos.map(todo => (
                <li key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo.id)}
                    />
                    {todo.title}
                </li>
            ))}
        </ul>
    );
};
