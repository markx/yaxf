import * as api from '../utils/api'

export const TASKS_REQUEST = 'TASKS_REQUEST'
export const TASKS_SUCCESS = 'TASKS_SUCCESS'
export const TASKS_FAILURE = 'TASKS_FAILURE'
export const RAISE_ERROR = 'RAISE_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export function requestTasks() {
    return {
        type: TASKS_REQUEST
    }
}

export function receiveTasks(tasks) {
    return {
        type: TASKS_SUCCESS,
        tasks
    }
}

export function raiseError(error) {
    return {
        type: RAISE_ERROR,
        error
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

export function showError(error) {
    return (dispatch) => {
        dispatch(raiseError(error))
        setTimeout(() => {
            dispatch(clearError())
            api.redirectToLogin()
        }, 1000)

    }
}

export function updateTasks() {
    return (dispatch) => {
        dispatch(requestTasks())

        api.fetchTasks()
        .then(json => {
            dispatch(receiveTasks(json.data))
        })
        .catch(error => {
            if (error.msg) {
                dispatch(showError(error.msg))
            } else {
                console.log(error)
            }
        })
    }
}


export const TASK_CHECK = 'TASK_CHECK'
export function checkTask(id, checked) {
    return {
        type: TASK_CHECK,
        id,
        checked
    }
}

export const SHOW_OUTPUT= 'SHOW_OUTPUT'
export const HIDE_OUTPUT= 'HIDE_OUTPUT'

export function showOutput() {
    return {
        type: SHOW_OUTPUT
    }
}

export function hideOutput() {
    return {
        type: HIDE_OUTPUT
    }
}











