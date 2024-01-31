interface NewTodoFormProps {
    value: string,
    updateText: (str: string) => void,
    handleAction: () => void,
}

export const NewTodoForm: React.FC<NewTodoFormProps> = ({ value, updateText, handleAction }) => {
    return (
        <label>
            <input
                placeholder='Enter task title'
                value={value}
                onChange={(e) => updateText(e.target.value)}
            />
            <button onClick={handleAction}>Add todo</button>
        </label>
    );
};

