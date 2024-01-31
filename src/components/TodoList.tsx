import { useAppSelector } from '../app/hooks';
import {TodoItem} from './TodoItem';
import {TodosType} from "../features/todoSlice";

export const TodoList: React.FC<TodosType> = () => {
    const todos = useAppSelector(state => state.todos.todos);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </ul>
    );
};
