import React, {useEffect, useState, KeyboardEvent, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type TodolistsType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

     let todolistID1 = v1()
     let todolistID2 = v1()

     let [todolists, setTodolists] = useState<Array<TodolistsType>>([
         {id: todolistID1, title: 'What to learn', filter: 'all'},
         {id: todolistID2, title: 'What to buy', filter: 'all'},
     ])

  let [tasks, setTasks] = useState<TasksStateType>({
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
        let newID = v1()
        let newTodo: TodolistsType = {id: newID, title: newTitle, filter: "all"}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newID]:[
                    {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true}]})
    }
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter((el) =>
            el.id !== todolistId
        ))
        delete tasks[todolistId]
    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string ) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el=>el.id===todolistId ? {...el, filter: value} : el))
    }
    const updateTask = (todolistId: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
    }
    const updateTodolist = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
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

export default App;
