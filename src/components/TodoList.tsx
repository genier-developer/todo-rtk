import {useAppDispatch, useAppSelector} from '../app/hooks';
import {TodoType, toggleStatus} from "../features/todoSlice";
import {FC} from "react";

type TodoListProps = {
    todos: TodoType[];
};
export const TodoList: FC<TodoListProps> = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const filter = useAppSelector(state => state.todos.filter);
    const dispatch = useAppDispatch();

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return false;
    });

    const handleToggle = (id: string) => {
        dispatch(toggleStatus(id));
    };

    return (
      <ul style={{ listStyleType: 'none' }}>
          {filteredTodos.map(todo => (
            <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                </span>
            </li>
          ))}
      </ul>
    );
    }