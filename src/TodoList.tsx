import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}




const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const tasksItems = props.tasks.length
       ? props.tasks.map((task:TaskType) => {
           const onClickRemoveTaskHandler = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
        : <span>Tasks list is empty</span>

    const onClickAddTaskTodoListHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTaskToDoListHandler = (e: KeyboardEvent<HTMLInputElement>) => {e.key === "Enter" && onClickAddTaskTodoListHandler()}


    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskToDoListHandler}
                />
                <button onClick={onClickAddTaskTodoListHandler}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={getOnClickSetFilterHandler("all")}>All</button>
                <button onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;