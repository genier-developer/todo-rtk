import { useAppDispatch } from '../app/hooks';
import {deleteTodo, toggleStatus} from '../features/todoSlice';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteIconContainer, TodoItems} from "../styles/styles";


interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
    const dispatch = useAppDispatch();

    return (
        <TodoItems>
            <Checkbox  checked={completed}
                       onChange={() => dispatch(toggleStatus(id))}/>

            <span>{title}</span>

            <DeleteIconContainer onClick={() => dispatch(deleteTodo(id))}>
                <DeleteIcon/>
            </DeleteIconContainer>
        </TodoItems>
    );
};
