const baseUrl = 'http://localhost:8090/api-goals-app/goals/';

/** ----------CREATE---------- */


/** -----------UPDATE----------- */


/** ------------DELETE------------ */


/** ------------GET ALL Goals------------ */
export const getAllGoalsByUserId = async (token) => {
    const response = await fetch(baseUrl,{
        method: 'GET',
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