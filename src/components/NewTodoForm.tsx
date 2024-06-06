import Button from '@mui/material/Button';
import {InputContainer, StyledTextField} from "../styles/styles";
import {FC} from "react";

interface NewTodoFormProps {
    value: string,
    updateText: (title: string) => void,
    handleAction: () => void,
}

export const NewTodoForm: FC<NewTodoFormProps> = ({ updateText, handleAction }) => {
    return (
        <InputContainer>
            <StyledTextField id="outlined-basic"
                       size={'small'}
                       label='Enter task title'
                       variant="outlined"
                       onChange={(e) => updateText(e.target.value)}/>
            <Button variant="contained" onClick={handleAction}>Add</Button>
        </InputContainer>
    );
};

