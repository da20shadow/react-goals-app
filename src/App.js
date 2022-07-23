import {Header, Footer, Sidebar, LeftMenu} from "./Components";
import {NavLink, Route, Routes} from "react-router-dom";
import {Account, Goal, GoalsList, Home, Login, NotFound, Register} from "./Pages";
import {useStateContext} from "./Contexts/ContextProvider";
import './Components/Sidebar/Sidebar.css';
import {logout} from "./Features/user/userSlice";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const {user,isLogged,activeSidebar, setActiveSidebar} = useStateContext();

    const expires = new Date(user.expires * 1000);
    const date = new Date();
    if (expires < date){
        dispatch(logout());
    }
    console.log('Expires: ',expires)
    console.log('Now: ',date)
    console.log('Expires Minutes: ',expires.getMinutes())
    console.log('Now Minutes: ',date.getMinutes())
    console.log(expires < date)
    return (
        <>
            <div className="flex relative dark:bg-main-dark-bg">

                {/*SideBar*/}
                <div className={`${activeSidebar 
                    ? 'w-full sm:w-72 fixed bg-white border-r border-light-blue shadow-xl shadow-light-blue z-50' 
                    : 'w-0 ' } ease-in-out duration-300 dark:bg-secondary-dark-bg`}>
                    <LeftMenu/>
                </div>

                {/*Header*/}
                <div className={`
                    ${activeSidebar ? 'md:ml-72' : ''} 
                        bg-main-bg dark:bg-main-dark-bg min-h-screen w-full`}
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Header/>
                    </div>
                    <div>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'/login'} element={isLogged ? <Account/> : <Login/>}/>
                            <Route path={'/register'} element={isLogged ? <Account/> : <Register/>}/>
                            <Route path={'/account'} element={isLogged ? <Account/> : <Login/>}/>
                            <Route path={'/goals'} element={isLogged ? <GoalsList/> : <Login/>}/>
                            <Route path={'/goal/:goal_id'} element={isLogged ? <Goal/> : <Login/>}/>
                            <Route path={'*'} element={<NotFound/>}/>
                        </Routes>
                    </div>
                    <Footer/>
                </div>

            </div>

        </>
    );
}



export default App;
