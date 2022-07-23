import {createContext, useContext, useState} from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import {getAllGoalsByUserId} from "../Services/GoalService";
import {getAllTasksByUserId} from "../Services/TaskService";
import {useSelector} from "react-redux";

const StateContext = createContext();
const initialState = {
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {
    const user = useSelector((state) => state.user.value);
    const[goals,setGoals] = useState();
    const[tasks,setTasks] = useState();
    const[screenSize,setScreenSize] = useState(initialState);
    const[activeSidebar,setActiveSidebar] = useState(false);
    const[activeProfileMenu,setActiveProfileMenu] = useState(false);

    const getAllGoals = () => {

        if (!goals){
            const goalsRequest = getAllGoalsByUserId(user.id,user.token);
            goalsRequest.then(res => {
                setGoals(res.goals)
            }).catch(err => {
                console.log(err)
            })
        }
        return goals;
    }

    const getAllTasks = () => {
        if (!tasks){
            const tasksRequest = getAllTasksByUserId(user.id,user.token);
            tasksRequest.then(res => {
                setTasks(res.tasks);
            }).catch(err => {
                console.log(err)
            })
        }
        return tasks;
    }

    return (
        <StateContext.Provider
            value={{
                user, isLogged: user.email,
                goals,setGoals, getAllGoals, getAllTasks,
                tasks,setTasks,
                screenSize, setScreenSize,
                activeSidebar,setActiveSidebar,
                activeProfileMenu,setActiveProfileMenu
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);