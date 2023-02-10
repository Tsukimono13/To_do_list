import React, {useEffect, useState, KeyboardEvent, useReducer, Reducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC, changeFilterAC,
    MainTodolistACType,
    removeTodolistAC, todolistReducer,
    updateTodolistAC
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./state/tasks-reducer";

export type TodolistsType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "New table", isDone: false},
            {id: v1(), title: "Fruits", isDone: false},
        ]
    });

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const removeTodoList = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(taskId, todolistId))
    }
    const addTask = (title: string, todolistId: string ) => {
        dispatchTasks(addTaskAC(title, todolistId))
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchTodolists(changeFilterAC(todolistId, value))
    }
    const updateTask = (todolistId: string, taskID: string, newTitle: string) => {
        dispatchTasks(updateTaskAC(todolistId, taskID, newTitle))
    }
    const updateTodolist = (todolistId: string, newTitle: string) => {
    dispatchTodolists(updateTodolistAC(todolistId, newTitle))
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((el) => {
                            let tasksForTodoList = tasks[el.id];
                            if (el.filter === "active") {
                                tasksForTodoList = tasks[el.id].filter(t => t.isDone === false)
                            }
                            if (el.filter === "completed") {
                                tasksForTodoList = tasks[el.id].filter(t => t.isDone === true)
                            }
                            /*switch (el.filter) {
                                case "active":
                                    return tasks[el.id].filter(t => !t.isDone)
                                case "completed":
                                    return tasks[el.id].filter(t => t.isDone)
                                default:
                                    return tasks[el.id]
                            }*/

                            return <Grid item>
                                <Paper style={{padding:"10px"}}>
                                    <TodoList
                                        key={el.id}
                                        todolistId={el.id}
                                        addTask={addTask}
                                        filter={el.filter}
                                        removeTask={removeTask}
                                        title={el.title}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        tasks={tasksForTodoList}
                                        removeTodolist={removeTodoList}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
