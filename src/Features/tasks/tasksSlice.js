import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllTasksByGoalId, getAllTasksByUserId} from "../../Services/TaskService";

const initialTasksState = {
    loading: false,
    tasksList: [],
    error: ''
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', () => {
    let user = localStorage.getItem('user');
    if (!user){
        return;
    }
    user = JSON.parse(user);

    return getAllTasksByUserId(user.token)
        .then(res => {
            console.log(res)
            console.log(res.tasks)
            return res.tasks;
        })
})

export const fetchTasksByGoalId = createAsyncThunk('tasks/fetchTasksByGoalId',() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return getAllTasksByGoalId()
})

export const TasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        addedTask: (state, action) => {
            state.tasksList.push(action.payload);
        },
        deletedTask: (state, action) => {
            state.tasksList = state.tasksList.filter(t=> t.id !== action.payload);
        }
    },
    extraReducers: builder =>  {
        builder.addCase(fetchTasks.pending,(state => {
            state.loading = true;
        }))
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasksList = action.payload;
            state.error = '';
        })
        builder.addCase(fetchTasks.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export const { addedTask,deletedTask } = TasksSlice.actions;
export default TasksSlice.reducer;