import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callBack: (title: string) => void

}
const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)

    const onClickAddTaskTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.callBack(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskToDoListHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTaskTodoListHandler()
    }

    const buttonStyle = {
        maxWidth: '37px',
        maxHeight: '37px',
        minWidth: '37px',
        minHeight: '37px',
        background: 'pink'
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
};

export default AddItemForm;