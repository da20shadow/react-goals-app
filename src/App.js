import {Header, Footer, Sidebar} from "./Components";
import {NavLink, Route, Routes} from "react-router-dom";
import {Account, Home, Login, NotFound, Register} from "./Pages";
import {useStateContext} from "./Contexts/ContextProvider";
import {useState} from "react";

function App() {
    const {activeSidebar} = useStateContext();

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>

            <Header/>
            <Sidebar />

            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/account'} element={<Account/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>

            <Footer/>
        </>
    );
}

export default App;
