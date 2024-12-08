import {useAppSelector} from '../app/hooks';
import {TodoType} from "../features/todo-slice";
import {FC} from "react";
import {Grid, List} from "@mui/material";
import {TodoItem} from "./todo-item";

type TodoListProps = {
    todos: TodoType[];
};
export const TodoList: FC<TodoListProps> = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const filter = useAppSelector(state => state.todos.filter);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return false;
    });

    return (
      <Grid item xs={12} md={6}>
          <List>
              {filteredTodos.map(todo => (
                <li key={todo.id}>
                    <TodoItem
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                    />
                </li>
              ))}
          </List>
      </Grid>
    )
}