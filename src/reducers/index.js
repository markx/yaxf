import { combineReducers } from 'redux'

import {TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE, TASK_CHECK} from '../actions'



let initialState = {
     1: { name: '1'},
     2: { name: '2'},
     3: { name: '3'},
     4: { name: '4'}
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


const app = combineReducers({
    tasks
})
export default app
