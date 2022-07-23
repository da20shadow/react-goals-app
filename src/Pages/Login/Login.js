import {AiOutlineLogin} from 'react-icons/ai';
import {login as userLogin} from '../../Services/UserService';
import { useDispatch } from "react-redux";
import {login} from "../../Features/user/userSlice";

function Login(){

    const dispatch = useDispatch();

    const processLogin = (e) => {
        e.preventDefault();

        const userData = new FormData(e.currentTarget);
        const {username,password} = Object.fromEntries(userData);

        const result = userLogin(username,password);
        result.then(res => {
            dispatch(login(res))
        })
            .catch(err => {
                console.log(err)
            })
    }
    return(
        <>
            <header className={'bg-white shadow mt-16 md:mt-0'}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center text-blue">LOGIN</h1>
                </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">

                            <div className="flex justify-center text-gray-200 bg-gray-700 mx-auto mb-10 w-full sm:4/5 md:w-1/2 pb-10 rounded-lg shadow-lg">

                                <form className="w-4/5 md:w-2/3 mt-8 space-y-6" onSubmit={processLogin}>
                                    <input type="hidden" name="remember" value="true"/>

                                    <div className="rounded-md shadow-sm -space-y-px">

                                        <div className={'my-4'}>
                                            <label htmlFor="username">Username:</label>
                                            <input id="username" name="username" type="text"
                                                   required
                                                   className="w-full bg-gray-300 px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                   placeholder="Username"/>
                                        </div>
                                        <div className={'my-4'}>
                                            <label htmlFor="password">Password</label>
                                            <input id="password" name="password" type="password" required
                                                   className="w-full bg-gray-300 px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                   placeholder="Password"/>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox"
                                                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                            <label htmlFor="remember-me"
                                                   className="ml-2 block text-sm text-gray-900"> Remember me </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#"
                                               className="font-medium text-dark-blue hover:text-blue"> Forgot your password? </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit"
                                                className="group relative w-full flex justify-center py-2 px-4 border
                                                border-transparent text-sm font-medium rounded-md text-white bg-blue
                                                hover:bg-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue">
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <AiOutlineLogin />
                                            </span>
                                            Sign in
                                        </button>
                                    </div>
                                </form>

                            </div>

                    </div>
                </div>
            </main>
        </>
    );
}
export default Login;