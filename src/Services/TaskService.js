const baseUrl = 'http://localhost:8090/api-goals-app/tasks/';

/** ------------------GET ALL Tasks By User ID------------------ */
export const getAllTasksByUserId = async (token) => {
    const response = await fetch(baseUrl,{
        method: 'GET',
        headers: {'Authorization':token}
    });

    return responseHandler(response);
}
/** ------------------GET ALL Tasks By Goal ID------------------ */
export const getAllTasksByGoalId = async (goal_id,token) => {
    const response = await fetch(`${baseUrl}user/${goal_id}`,{
        method: 'POST',
        headers: {'Content-type':'Application/json'},
        body: JSON.stringify({token})
    });

    return responseHandler(response);
}
/** ------------POST ADD new task by goal id------------ */
export const addTaskByGoalId = async (title,token,goal_id,description) => {
    const response = await fetch(`${baseUrl}`,{
        method: 'POST',
        headers: {'Content-type':'Application/json','Authorization':token},
        body: JSON.stringify({title,goal_id,description})
    });

    return responseHandler(response);
}

/** ------------DELETE Task By id------------ */
export const deleteTaskById = async (token,task_id) => {
    const response = await fetch(`${baseUrl}${task_id}`,{
        method: 'DELETE',
        headers: {'Authorization':token}
    });

    return responseHandler(response);
}

async function responseHandler(response){
    const result = await response.json();

    if (response.ok){
        return result;
    }else {
        throw result;
    }
}