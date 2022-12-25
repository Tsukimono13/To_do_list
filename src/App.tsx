import React, {useEffect, useState, KeyboardEvent} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";



export type FilterValuesType = "all" | "active" | "completed"
function App() {

    const todoListTitle: string = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("active")

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask =(title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }



    const getFilteredTasksForRender = () => {
        let tasksForRender;
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender()


    return (
        <div className="App">
           <TodoList addTask={addTask}
           removeTask ={removeTask}
           title={todoListTitle}
           changeFilter={changeFilter}
           tasks={filteredTasksForRender}/>

        </div>
    );
}

export default App;
