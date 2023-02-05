import {FilterValuesType, TodolistsType} from "../App";
import {removeTaskAC} from "./tasks-reducer";
import {v1} from "uuid";

export const TodolistReducer = (state: TodolistsType[], action: MainTodolistACType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el=>el.id!==action.payload.id)
        }
        case 'ADD-TODOLIST': {
            let newID = v1();
            let newTodo: TodolistsType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
            return  [ ...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el=>el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el=> el.id===action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}
type MainTodolistACType = removeTodolistACType | addTodolistACType | updateTodolistACType | changeFilterACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title:string)=> {
    return {
        type:'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}
export type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (id:string, title:string)=>{
    return {
        type:'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC =(id: string, filter: FilterValuesType)=> {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}