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


function login() {
    document.location.hash = '#/login';
}

export function showError(error) {
    return (dispatch) => {
        dispatch(raiseError(error))
        setTimeout(() => {
            dispatch({
                type: CLEAR_ERROR
            })
            login()
        }, 1000)

    }
}


function saveCookies() {

}

export function updateTasks() {
    return dispatch => {
        dispatch(requestTasks());
        return fetch('http://lixian.qq.com/handler/lixian/get_lixian_status.php', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(json => {
            if (json.ret != 0) {
                console.error(json)
                dispatch(showError(json.msg))
                //TODO: clear cookie localStorage
                //TODO: login
                return
            }

            saveCookies();
            dispatch(receiveTasks(json.data))
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
