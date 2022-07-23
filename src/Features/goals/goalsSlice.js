import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import {getAllGoalsByUserId} from "../../Services/GoalService";

const initialGoalsState = {
    loading: false,
    goalsList: [],
    error: ''
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', () => {
    let user = localStorage.getItem('user');
    if (!user){
        return;
    }
    user = JSON.parse(user);

    return getAllGoalsByUserId(user.token)
        .then(res => {
            return res.goals;
        })
})


export const goalsSlice = createSlice({
    name: 'goals',
    initialState: initialGoalsState,
    extraReducers: builder =>  {
        builder.addCase(fetchGoals.pending,state => {
            state.loading = true;
        })
        builder.addCase(fetchGoals.fulfilled, (state, action) => {
            state.loading = false;
            state.goalsList = action.payload;
            state.error = '';
        })
        builder.addCase(fetchGoals.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const {addGoal} = goalsSlice.actions;
export default goalsSlice.reducer;