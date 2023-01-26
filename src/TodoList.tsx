import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {


    const updateTaskHandler = (tID: string, newTitle: string) => {
        props.updateTask(props.todolistId, tID, newTitle)
    }

    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => props.removeTask(props.todolistId, task.id)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.todolistId, task.id, e.currentTarget.checked)
            const isDoneClasses = task.isDone ? "isDone" : "notIsDone"


            return (
                <li key={task.id} className={isDoneClasses}>
                    <Checkbox onChange={onChangeSetTaskStatus} checked={task.isDone} />
                    <EditableSpan oldTitle={task.title} callBack={(newTitle) => updateTaskHandler(task.id, newTitle)}/>
                    <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}><DeleteIcon />
                    </IconButton>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const getOnClickSetFilterHandler = (value: FilterValuesType, todolistId: string) => () => props.changeFilter(todolistId, value);

    const removeTodoListHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle)
    }
    return (
        <div>
            <h3><EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <Button variant={props.filter === "all" ?"outlined" :"contained"}  onClick={getOnClickSetFilterHandler("all", props.todolistId)} >All</Button>
                <Button variant={props.filter === "active" ?"outlined" :"contained"}  onClick={getOnClickSetFilterHandler("active", props.todolistId)} >Active</Button>
                <Button variant={props.filter === "completed" ?"outlined" :"contained"}   onClick={getOnClickSetFilterHandler("completed", props.todolistId)}>Completed</Button>



               {/* <Button className={props.filter === "all" ? "activeFilter" : undefined}
                        onClick={getOnClickSetFilterHandler("all", props.todolistId)}>All
                </Button>
                <Button className={props.filter === "active" ? "activeFilter" : undefined}
                        onClick={getOnClickSetFilterHandler("active", props.todolistId)}>Active
                </Button>
                <Button className={props.filter === "completed" ? "activeFilter" : undefined}
                        onClick={getOnClickSetFilterHandler("completed", props.todolistId)}>Completed
                </Button>*/}
            </div>
        </div>
    );
};

export default TodoList;