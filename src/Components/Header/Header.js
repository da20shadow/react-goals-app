/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineBell,
    AiOutlineDashboard,
    AiOutlineSetting,
    AiOutlineLogout
} from 'react-icons/ai';
import {useStateContext} from "../../Contexts/ContextProvider";
import {Link, NavLink} from "react-router-dom";


export default function Header() {

    const navigation = [
        {name: 'Dashboard', href: '/account', current: true},
        {name: 'Login', href: '/login', current: false},
        {name: 'Register', href: '/register', current: false},
        {name: 'Calendar', href: '#', current: false},
    ]

    const {activeSidebar, setActiveSidebar, activeProfileMenu, setActiveProfileMenu} = useStateContext();


    const activeLink = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium ';
    const normalLink = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ';

    const dropdown = 'block flex items-center px-4 py-1 font-semibold text-md text-gray-700 mx-2 my-1 rounded-md ';
    const activeDropdown = dropdown + 'bg-gray-100 ';

    const [showHideProfileDropDown,setShowHideProfileDropDown] = useState('hidden')
    const hideProfileDropdown = () => {
        setActiveProfileMenu(!activeProfileMenu)
        activeProfileMenu
            ? setShowHideProfileDropDown('block')
            : setTimeout(() => {
             setShowHideProfileDropDown('hidden')
        },500)
    }

    return (
        <>

            <div className="min-h-full">
                <nav className="bg-gray-800">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

                        <div className="relative flex items-center justify-between h-16">

                            {/*Sidebar Menu Button and LOGO */}
                            <div className={`inset-y-0 left-0 flex items-center`}>

                                {/*Button TODO: Hidden for guests */}
                                <button type="button"
                                        onClick={() => setActiveSidebar(!activeSidebar)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="sr-only">Open Sidebar menu</span>

                                    {
                                        activeSidebar
                                            ? (<AiOutlineClose size={'24px'} className={'block h-6 w-6'}/>)
                                            : (<AiOutlineMenu size={'24px'} className={'block h-6 w-6'}/>)

                                    }
                                </button>

                                {/*LOGO TODO: add logo img */}
                                <div className="flex-shrink-0 flex items-center mr-4">
                                    <Link to={'/'} className={'ml-3 text-white font-bold text-2xl'}>Goals App</Link>
                                </div>

                            </div>

                            {/*Top Menu TODO: hidden for logged users */}
                            <div className="flex space-x-2 sm:space-x-4 items-center items-stretch justify-start">

                                <NavLink to={'/'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>
                                    Home
                                </NavLink>

                                <NavLink to={'/login'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>
                                    Login
                                </NavLink>

                                <NavLink to={'/register'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>
                                    Register
                                </NavLink>

                            </div>

                            {/*Notification & Profile Dropdown TODO: Hidden for guests */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2
                                    sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/*Notification button*/}
                                <button type="button"
                                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">View notifications</span>
                                    <AiOutlineBell className={'h-6 w-6'}/>
                                </button>

                                {/*Profile Dropdown*/}
                                <div className="ml-3 relative">

                                    {/*Avatar*/}
                                    <div onClick={hideProfileDropdown}>
                                        <button type="button"
                                                className="bg-gray-800 flex text-sm rounded-full
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-offset-gray-800 focus:ring-white"
                                                id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                 alt=""/>
                                        </button>
                                    </div>

                                    {/*Dropdown TODO: Add better transition the style classes are added below */}
                                    <div className={`${showHideProfileDropDown} 
                                    ${activeProfileMenu
                                        ? 'opacity-0 scale-95'
                                        : 'opacity-100 scale-100'} ease-in-out duration-500 origin-top-right 
                                            absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                                            bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                         >

                                        <NavLink to={'/account'}
                                                 className={({isActive}) =>
                                                     isActive
                                                         ? activeDropdown
                                                         : dropdown + 'hover:bg-gray-100'
                                                 }>
                                            <AiOutlineDashboard className={'mr-2 h-4 w-4'}/> Account
                                        </NavLink>

                                        <NavLink to={'/settings'}
                                                 className={({isActive}) =>
                                                     isActive
                                                         ? activeDropdown
                                                         : dropdown + 'hover:bg-gray-100'
                                                 }>
                                            <AiOutlineSetting className={'mr-2 h-4 w-4'}/> Settings
                                        </NavLink>

                                        <NavLink to={'/logout'}
                                                 className={({isActive}) =>
                                                     isActive
                                                         ? activeDropdown
                                                         : dropdown + 'hover:text-red-700 hover:bg-red-100'
                                                 }>
                                            <AiOutlineLogout className={'mr-2 h-4 w-4'}/> Sign out
                                        </NavLink>

                                    </div>

                                </div>


                            </div>


                        </div>
                    </div>

                </nav>

            </div>
        </>
    )
}
