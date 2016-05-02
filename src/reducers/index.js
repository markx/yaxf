import { combineReducers } from 'redux'

import {
    TASKS_REQUEST, TASKS_SUCCESS,
    TASK_CHECK,
    MESSAGE_OVERLAY_SHOW, MESSAGE_OVERLAY_HIDE,
    SHOW_OUTPUT, HIDE_OUTPUT
} from '../actions'



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


function messageOverlay(state = { show: false }, action) {
    switch (action.type) {
        case 'MESSAGE_OVERLAY_SHOW':
            return {
                show: true,
                text: action.text,
                isError: action.isError
            }

        case 'MESSAGE_OVERLAY_HIDE':
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
    messageOverlay,
    output
})
export default app
