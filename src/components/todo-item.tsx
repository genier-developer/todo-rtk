import { useAppDispatch } from '../app/hooks';
import { deleteTodo, toggleStatus } from '../features/todo-slice';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from "react";
import { Card, CardContent, CardActions, Typography, IconButton } from "@mui/material";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoItem: FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
        padding: 1,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Checkbox
          checked={completed}
          onChange={() => dispatch(toggleStatus(id))}
          color="primary"
        />
        <Typography
          variant="body1"
          sx={{
            textDecoration: completed ? 'line-through' : 'none',
            marginLeft: 2,
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton
          color="error"
          onClick={() => dispatch(deleteTodo(id))}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
