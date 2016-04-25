export const TASKS_REQUEST = 'TASKS_REQUEST'
export const TASKS_SUCCESS = 'TASKS_SUCCESS'
export const TASKS_FAILURE = 'TASKS_FAILURE'

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
