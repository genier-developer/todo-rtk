import { useAppDispatch } from '../app/hooks';
import {deleteTodo, toggleStatus} from '../features/todoSlice';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteIconContainer, TodoItems} from "../styles/styles";
import {FC} from "react";


interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
}

export const TodoItem: FC<TodoItemProps> = ({ id, title, completed }) => {
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
