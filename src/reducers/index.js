import { combineReducers } from 'redux'

import {
    TASKS_REQUEST, TASKS_SUCCESS,
    TASK_CHECK,
    RAISE_ERROR, CLEAR_ERROR,
    SHOW_OUTPUT, HIDE_OUTPUT
} from '../actions'



let initialState = {
}

console.log(...initialState, ...{id:1, name: 'aaaaa'})


function tasks(state = {}, action) {
    switch (action.type) {
        case 'TASKS_SUCCESS':
            let tasks = {}
            for (let task of action.tasks) {
                tasks[task.mid] = task
            }
            return tasks

        case 'TASK_CHECK':
			let newState = {...state}
            let checkedTask = state[action.id]
            newState[action.id] = {...checkedTask, isChecked: action.checked}
            return newState



        default:
            return state
    }
}


function errorSlate(state = { show: false }, action) {
    switch (action.type) {
        case 'RAISE_ERROR':
            return {
                show: true,
                error: action.error
            }

        case 'CLEAR_ERROR':
            return {
                show: false
            }

        default:
            return state
    }

}

function output(state = false, action) {
    switch (action.type) {
        case 'SHOW_OUTPUT':
            return true

        case 'HIDE_OUTPUT':
            return false
        default:
            return state
    }
}


const app = combineReducers({
    tasks,
    errorSlate,
    output
})
export default app
