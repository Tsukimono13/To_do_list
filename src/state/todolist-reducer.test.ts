import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistAC
} from "./todolist-reducer";


let todolistID1 = v1()
let todolistID2 = v1()
let startState:Array<TodolistsType>


beforeEach(()=>{
    todolistID1 = v1()
    todolistID2 = v1()
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be removed', ()=> {

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})
test('correct todolist should be added', () => {


    let newTodolistTitle = 'New Todolist'



    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'


    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState, updateTodolistAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'


    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistReducer(startState, changeFilterAC(todolistId2,newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})


