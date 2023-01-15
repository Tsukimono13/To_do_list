import React, {useEffect, useState, KeyboardEvent} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type TodolistsType = { id: string, title: string }
export type FilterValuesType = "all" | "active" | "completed"
type TaskTypeForAssocArray = {
    data: TaskType[]
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskTypeForAssocArray
}


function App() {

    /* let todolistID1 = v1()
     let todolistID2 = v1()

     let [todolists, setTodolists] = useState<Array<todolistsType>>([
         {id: todolistID1, title: 'What to learn', filter: 'all'},
         {id: todolistID2, title: 'What to buy', filter: 'all'},
     ])


     let [tasks, setTasks] = useState({
         [todolistID1]: [
             {id: v1(), title: "HTML&CSS", isDone: true},
             {id: v1(), title: "JS", isDone: true},
             {id: v1(), title: "ReactJS", isDone: false},
             {id: v1(), title: "Rest API", isDone: false},
             {id: v1(), title: "GraphQL", isDone: false},
         ],
         [todolistID2]: [
             {id: v1(), title: "HTML&CSS2", isDone: true},
             {id: v1(), title: "JS2", isDone: true},
             {id: v1(), title: "ReactJS2", isDone: false},
             {id: v1(), title: "Rest API2", isDone: false},
             {id: v1(), title: "GraphQL2", isDone: false},
         ]
     });*/
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true}
            ],
            filter: "all"
        },
        [todolistID2]: {
            data: [
                {id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true}
            ],
            filter: "all"
        }
    });

    const addTodolist = (newTitle: string) => {
        let newID = v1()
        let newTodo = {id: newID, title: newTitle, filter: "all"}
        setTodolists([newTodo,...todolists])
        setTasks({...tasks, [newID]:{...tasks [todolistID1], data: [
            {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true}]}})
    }

    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter((el) =>
            el.id !== todolistId
        ))
        delete tasks[todolistId]
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== taskId)}
        })
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone: isDone} : el)
            }
        })
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: value}})
    }
 const updateTask=(todolistId: string, taskID: string, newTitle:string)=> {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], data:tasks[todolistId].data.map(el => el.id===taskID ? {...el, title: newTitle} : el)}})
 }
 const updateTodolist = (todolistId: string, newTitle: string)=> {
setTodolists(todolists.map(el => el.id===todolistId ? {...el,title:newTitle} : el))
 }
    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {
                todolists.map((el) => {
                    let tasksForTodoList = tasks[el.id].data;
                    if (tasks[el.id].filter === "active") {
                        tasksForTodoList = tasks[el.id].data.filter(t => t.isDone === false)
                    }
                    if (tasks[el.id].filter === "completed") {
                        tasksForTodoList = tasks[el.id].data.filter(t => t.isDone === true)
                    }
                    /*switch (el.filter) {
                        case "active":
                            return tasks[el.id].filter(t => !t.isDone)
                        case "completed":
                            return tasks[el.id].filter(t => t.isDone)
                        default:
                            return tasks[el.id]
                    }*/


                    return <TodoList
                        key={el.id}
                        todolistId={el.id}
                        addTask={addTask}
                        filter={tasks[el.id].filter}
                        removeTask={removeTask}
                        title={el.title}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        tasks={tasksForTodoList}
                        removeTodolist={removeTodoList}
                        updateTask ={updateTask}
                        updateTodolist={updateTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
