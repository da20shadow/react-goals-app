import { createSlice } from "@reduxjs/toolkit";

let initialValue = {
    id: '',
    email: '',
    username: '',
    token: '',
    expires: ''
}
const initialUserState = () => {
    try {
        let item = localStorage.getItem('user');
        return item
            ? JSON.parse(item)
            : initialValue;
    } catch(err) {
        console.log(err);
        return initialValue;
    }
}
const initialUser = initialUserState();

export const userSlice = createSlice({
    name: 'user',
    initialState: {value: initialUser},
    reducers: {
        login: (state,action) => {
            try {
                localStorage.setItem('user', JSON.stringify(action.payload))
                state.value = action.payload;
            } catch(err) {
                console.log(err);
            }
        },
        logout: (state) => {
            state.value = initialValue;
            localStorage.clear();
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;