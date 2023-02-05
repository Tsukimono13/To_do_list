import {TasksStateType, TodolistsType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {addTodolistAC, addTodolistACType, removeTodolistACType, updateTodolistACType} from "./todolist-reducer";


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType= ReturnType<typeof addTaskAC>
export type ChangeStatusActionType= ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType= ReturnType<typeof updateTaskAC>


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeStatusActionType | UpdateTaskActionType | addTodolistACType | removeTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return { ...state, [action.todolistId]: [newTask,...state[action.todolistId]]}
        case 'CHANGE-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {...el, title: action.newTitle} : el)}
        case 'ADD-TODOLIST':
            return  {...state, [action.payload.todolistId]:[]}
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = ( taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK',  taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-STATUS', todolistId, taskId, isDone} as const
}
export const updateTaskAC = (todolistId: string, taskID: string, newTitle: string)=>{
    return {type: 'UPDATE-TASK', todolistId, taskID, newTitle} as const
}

