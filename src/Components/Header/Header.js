/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useEffect, useState} from 'react'
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
    const {user,activeSidebar,setActiveSidebar,screenSize,setScreenSize,activeProfileMenu, setActiveProfileMenu} = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveSidebar(false);
        } else {
            setActiveSidebar(true);
        }
    }, [screenSize]);

    const navigation = [
        {name: 'Dashboard', href: '/account', current: true},
        {name: 'Login', href: '/login', current: false},
        {name: 'Register', href: '/register', current: false},
        {name: 'Calendar', href: '#', current: false},
    ]

    const activeLink = 'bg-gray text-white px-3 py-2 rounded-md text-sm font-medium ';
    const normalLink = 'text-gray-300 hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium ';

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

            {/*Top Fixed News for New Product*/}
            <div className="bg-dark-blue">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <span className="flex p-2 rounded-lg bg-blue">
                            {/*Heroicon name: outline/speakerphone */}
                                <svg className="h-6 w-6 text-white"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" aria-hidden="true">
                                <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                            </svg>
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden"> We announced a new product! </span>
                                <span className="hidden md:inline"> Big news! We're excited to announce a brand new product. </span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <a href="#"
                               className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue bg-white hover:bg-light-blue"> Learn
                                more </a>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button type="button"
                                    className="-mr-1 flex p-2 rounded-md hover:bg-blue focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                                <span className="sr-only">Dismiss</span>
                                {/*Heroicon name: outline/x */}
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="min-h-full">
                <nav className="bg-light-gray">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

                        <div className="relative flex items-center justify-between h-16">

                            {/*Sidebar Menu Button and LOGO */}
                            <div className={`inset-y-0 left-0 flex items-center`}>

                                {/*Button TODO: Hidden for guests */}

                                {
                                    activeSidebar
                                        ? (<button onClick={() => setActiveSidebar(!activeSidebar)}
                                                   className="inline-flex items-center justify-center p-2 rounded-md text-gray
                                        hover:text-light-gray hover:bg-gray block sm:hidden" >
                                            <AiOutlineClose size={'24px'} className={'h-6 w-6'}/>
                                        </button>)
                                        : (<button onClick={() => setActiveSidebar(!activeSidebar)}
                                                   className="inline-flex items-center justify-center p-2 rounded-md text-gray
                                        hover:text-light-gray hover:bg-gray" >
                                            <AiOutlineMenu size={'24px'} className={'block h-6 w-6'}/>
                                        </button>)
                                }

                                {/*LOGO TODO: add logo img */}
                                <div className="flex-shrink-0 flex items-center mr-4">
                                    <Link to={'/'} className={'ml-3 text-blue font-extrabold text-2xl'}>GoalsApp</Link>
                                </div>

                            </div>

                            {/*Top Menu TODO: hidden for logged users */}
                            {
                                user && (
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
                                )
                            }

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
