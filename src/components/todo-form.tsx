import Button from '@mui/material/Button';
import {FC} from "react";
import {Grid, TextField} from "@mui/material";

interface NewTodoFormProps {
    value: string,
    updateText: (title: string) => void,
    handleAction: () => void,
}

export const TodoForm: FC<NewTodoFormProps> = ({ updateText, handleAction }) => {
    return (
      <Grid container style={{ padding: "20px" }}>
        <TextField id="outlined-basic"
                   size={'small'}
                   label='Enter task title'
                   variant="outlined"
                   onChange={(e) => updateText(e.target.value)}/>

        <Button variant="contained" onClick={handleAction}>Add</Button>
      </Grid>
    );
};

