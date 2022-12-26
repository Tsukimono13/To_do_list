import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeStatus : (taskId: string, isDone:boolean) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}




const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length
       ? props.tasks.map((task:TaskType) => {
           const onClickRemoveTaskHandler = () => props.removeTask(task.id)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>)=> props.changeStatus(task.id, e.currentTarget.checked)
            const isDoneClasses = task.isDone ? "isDone" : "notIsDone"


            return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}
                onChange={onChangeSetTaskStatus}
                    />
                <span className={isDoneClasses}>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
        : <span>Tasks list is empty</span>

    const onClickAddTaskTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle)
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
    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const errorMessage = error && <p style={{color: "red", margin: "0"}}>Please, enter task title</p>

    return (
        <div>
            <h3>{props.title}</h3>
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
            <ul>
                {tasksItems}
            </ul>
            <div>

                <button className={props.filter === "all" ? "activeFilter" : undefined} onClick={getOnClickSetFilterHandler("all")}>All</button>
                <button className={props.filter === "active" ? "activeFilter" : undefined} onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button className={props.filter === "completed" ? "activeFilter" : undefined} onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;