import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callBack: (title: string) => void
}
export const AddItemForm = memo((props: PropsType) => {
    console.log("AddItemForm")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onClickAddTaskTodoListHandler = () => {
        if (title.trim() !== "") {
            props.callBack(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskToDoListHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if (error !== null) {
           setError(null);
       }
       if (e.key === "Enter"){
           onClickAddTaskTodoListHandler()
       }
    }

    const buttonStyle = {
        maxWidth: '37px',
        maxHeight: '37px',
        minWidth: '37px',
        minHeight: '37px',
        background: '#3aa8c9ee'
    }

    return (
        <div>
            <TextField
                size={"small"}
                id="outlined-basic"
                label={error? "Title is required" : "Please, enter your Title"}
                variant="outlined"
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskToDoListHandler}
            />
            <Button variant="contained" style={buttonStyle} onClick={onClickAddTaskTodoListHandler}>+</Button>
        </div>
    );
});

export default AddItemForm;