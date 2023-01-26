import {TaskType} from "../TodoList";
import {TodolistsType} from "../App";

export const TasksReducer = (state: TaskType[], action: MainTaskType)=> {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state
        }
        default: return state
    }
}

type MainTaskType = removeTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC=(todolistId: string, taskId: string)=>{
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}
