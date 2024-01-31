import { useAppDispatch } from '../app/hooks';
import { toggleComplete, removeTodo } from '../features/todoSlice';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
    const dispatch = useAppDispatch();

    return (
        <li>
            <input
                type='checkbox'
                checked={completed}
                onChange={() => dispatch(toggleComplete(id))}
            />
            <span>{title}</span>
            <span onClick={() => dispatch(removeTodo(id))}>X</span>
        </li>
    );
};
