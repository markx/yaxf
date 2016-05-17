import * as api from '../utils/api'

export const TASKS_REQUEST = 'TASKS_REQUEST'
export const TASKS_SUCCESS = 'TASKS_SUCCESS'
export const TASKS_FAILURE = 'TASKS_FAILURE'
export const MESSAGE_OVERLAY_SHOW = 'MESSAGE_OVERLAY_SHOW'
export const MESSAGE_OVERLAY_HIDE = 'MESSAGE_OVERLAY_HIDE'

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

export function showMessage(text, isError = false) {
    return {
        type: MESSAGE_OVERLAY_SHOW,
        text,
        isError
    }
}

export function hideMessage() {
    return {
        type: MESSAGE_OVERLAY_HIDE
    }
}

export function showError(error) {
    return dispatch => {
        dispatch(showMessage(error, true))
        setTimeout(() => {
            dispatch(hideMessage())
        }, 2000)
    }
}

export function showLoginError() {
    return (dispatch) => {
        dispatch(showError("Need To Login"))
        setTimeout(() => {
            dispatch(hideMessage())
            api.redirectToLogin()
        }, 2000)

    }
}

export function updateTasks() {
    return (dispatch) => {
        dispatch(requestTasks())
        dispatch(showMessage("Updating Tasks"))

        api.fetchTasks()
        .then(json => {
            dispatch(receiveTasks(json.data || []))
            dispatch(hideMessage())
        })
        .catch(error => {
            if (error.msg) {
                dispatch(showLoginError())
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


export function removeTask() {
    return (dispatch, getState) => {
        const state = getState()
        let taskArr = Object.keys(state.tasks).map(key => state.tasks[key])
        let idsToRemove = taskArr
            .filter(task => task.isChecked)
            .map(task => task.mid)
        if (idsToRemove.length == 0) {
            dispatch(showError("Nothing to remove"))
            return
        }

        dispatch(showMessage("Removing Task"))
        api.removeTask(idsToRemove)
        .then(() => {
            dispatch(updateTasks())
        }).catch((error) => {
            dispatch(showError(error.msg))
        })
    }
}

export const SHOW_NEW_TASK_BOX = 'SHOW_NEW_TASK_BOX'
export const HIDE_NEW_TASK_BOX = 'HIDE_NEW_TASK_BOX'

export function showNewTaskBox() {
    return {
        type: SHOW_NEW_TASK_BOX
    }
}

export function hideNewTaskBox() {
    return {
        type: HIDE_NEW_TASK_BOX
    }
}

export function addTask(url, fileName, fileSize) {
    return (dispatch) => {
        dispatch(showMessage("Adding"))
        api.addURLTask(url, fileName, fileSize)
            .then(() => {
                dispatch(hideNewTaskBox())
                dispatch(updateTasks())
            }).catch((error) => {
                dispatch(showError('Failed to add task: ' + error[0].errcode))
            })
    }
}
