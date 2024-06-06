
import styled from 'styled-components';
import { TextField} from '@mui/material';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  font-size: 1.2rem;
  
`;

export const InputContainer = styled.label`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

export const StyledTextField = styled(TextField)`
  width: 250px;
`;

export const TodoLists = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TodoItems = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const DeleteIconContainer = styled.span`
  cursor: pointer;

`;

