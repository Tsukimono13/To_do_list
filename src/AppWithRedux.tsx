import React, {useEffect, useState, KeyboardEvent, useReducer, Reducer, useCallback} from 'react';
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
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

export type TodolistsType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state=> state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state=> state.tasks)
    const dispatch = useDispatch()

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    },[dispatch])
    const addTask = useCallback((title: string, todolistId: string ) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    },[dispatch])
    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    },[dispatch])
    const updateTask = useCallback((todolistId: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(todolistId, taskID, newTitle))
    }, [dispatch])
    const updateTodolist = useCallback((todolistId: string, newTitle: string) => {
    dispatch(updateTodolistAC(todolistId, newTitle))
    },[dispatch])
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


                            return <Grid key={el.id} item>
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

export default AppWithRedux;
