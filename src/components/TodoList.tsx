import { useAppSelector } from '../app/hooks';
import {TodoItem} from './TodoItem';
import {TodoLists} from '../styles/styles'

export const TodoList = () => {
    const todos = useAppSelector(state => state.todos.todos);

    return (
        <TodoLists>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </TodoLists>
    );
};
