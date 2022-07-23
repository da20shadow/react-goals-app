import {useStateContext} from "../../Contexts/ContextProvider";
import {useEffect} from "react";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { login, logout } from '../../Features/user/userSlice'
import {useNavigate} from "react-router-dom";
import {fetchTasks} from "../../Features/tasks/tasksSlice";

function Account(){
    const redirect = useNavigate();
    const {isLogged} = useStateContext();

    const user = useSelector((state) => state.user.value)
    const tasks = useSelector(state => state.tasks)

    const dispatch = useDispatch();

    const processLogout = () => {
        dispatch(logout());
        redirect('/login');
    }

    return(
        <>
            <header className={'bg-white shadow mt-16 md:mt-0'}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center text-blue">Dashboard</h1>
                    <p>Welcome {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>ID: {user.id}</p>
                </div>
                <input type="text"/>
                <button onClick={processLogout}>Logout</button>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            Current Focus!


                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Account;