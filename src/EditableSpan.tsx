import React, {ChangeEvent, memo, useState} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void

}

const EditableSpan = memo((props: PropsType) => {
    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState<string>(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        onClickAddTaskTodoListHandler()
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setNewTitle(e.currentTarget.value)

    const onClickAddTaskTodoListHandler = () => {
        props.callBack(newTitle)
    }

    return (
        edit
            ? <input value={newTitle} onChange={onChangeSetLocalTitleHandler} onBlur={onDoubleClickHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    );
});

export default EditableSpan;