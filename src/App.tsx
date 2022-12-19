import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export type FilterValuesType = "all" | "active" | "completed"
function App() {
    const todoListTitle: string = "What to learn"
    const todoListTitle_2: string = "What to buy"

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("active")

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }



    const getFilteredTasksForRender = () => {
        let tasksForRender;
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender()



    return (
        <div className="App">
           <TodoList
           removeTask ={removeTask}
           title={todoListTitle}
           changeFilter={changeFilter}
           tasks={filteredTasksForRender}/>

        </div>
    );
}

export default App;
