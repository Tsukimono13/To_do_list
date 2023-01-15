import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callBack: (title: string)=>void

}
const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)

    const onClickAddTaskTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.callBack(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskToDoListHandler = (e: KeyboardEvent<HTMLInputElement>) => {e.key === "Enter" && onClickAddTaskTodoListHandler()}
    const errorInputClasses = error ? "inputError" : undefined
    const errorMessage = error && <p style={{color: "red", margin: "0"}}>Please, enter task title</p>

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskToDoListHandler}
                className={errorInputClasses}
            />
            <button onClick={onClickAddTaskTodoListHandler}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;