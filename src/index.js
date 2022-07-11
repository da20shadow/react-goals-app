import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Style/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ContextProvider} from "./Contexts/ContextProvider";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import userReducer from './Features/user/userSlice';
import goalsReducer from "./Features/goals/goalsSlice";
import taskReducer from './Features/tasks/tasksSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        goals: goalsReducer,
        tasks: taskReducer,
    },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <ContextProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
