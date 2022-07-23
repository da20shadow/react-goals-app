import {AiOutlineClose, AiOutlineFire, AiOutlineUser,AiOutlineSetting} from "react-icons/ai";
import {FaRegLightbulb,FaMoneyBillWave} from "react-icons/fa";
import {GiStairsGoal,GiTomato} from "react-icons/gi";
import {useStateContext} from "../../Contexts/ContextProvider";
import {NavLink} from "react-router-dom";
import {BsListTask,BsClock} from "react-icons/bs";
import {useState} from "react";
import './Sidebar.css';

function Sidebar() {

    const {activeSidebar, setActiveSidebar} = useStateContext();

    const iconStyle = 'h-5 min-h-min w-5 min-w-min';
    const textStyle = `${activeSidebar && 'opacity-100'} capitalize pl-3 py-3`;

    const linkStyle = `${activeSidebar
        ? 'w-full lg:w-72 pl-10'
        : 'trigger-hover w-16 hover:w-72 pl-5 invisible lg:visible'} ease-in-out duration-500 
            bg-gray-700 hover:bg-gradient-to-r from-gray-600 to-slate-600 mb-2
            overflow-hidden block z-10 flex items-center flex-nowrap whitespace-nowrap
            hover:border-r-4 hover:border-blue-500`;

    const links = [
        {
            title: 'Goals', links: [
                {id:1, icon:<AiOutlineFire className={iconStyle}/>, href: '/goals', text: 'All Goals'},
                {id:2, icon:<GiStairsGoal className={iconStyle}/>, href: '/personal-goals', text: 'Personal goals'},
                {id:3, icon:<FaMoneyBillWave className={iconStyle}/>, href: '/financial-goals', text: 'Financial goals'},
                {id:4, icon:<AiOutlineUser className={iconStyle}/>, href: '/other-goals', text: 'Other Goals'}
            ]
        },
        {
            title: 'Tasks', links: [
                {id:5, icon:<AiOutlineFire className={iconStyle}/>, href: '/tasks', text: 'All Tasks'},
                {id:6, icon:<GiStairsGoal className={iconStyle}/>, href: '/planned-tasks', text: 'Planned tasks'},
                {id:7, icon:<FaMoneyBillWave className={iconStyle}/>, href: '/urgent-tasks', text: 'Urgent tasks'},
                {id:8, icon:<AiOutlineUser className={iconStyle}/>, href: '/unplanned-tasks', text: 'Unplanned tasks'},
                {id:9, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:19, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:29, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:39, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:39, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:39, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:39, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:39, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
                {id:39, icon:<BsListTask className={iconStyle}/>, href: '/other-tasks', text: 'Other tasks'},
            ]
        },

    ];
    
    return (
        // ${activeSidebar && 'translate-x-full'}
        //TODO add transition animation

        <div className={`${activeSidebar ? 'w-full sm:w-72' : 'w-0 lg:w-16'} ease-in-out duration-300
                                fixed top-0 left-0 h-screen text-gray-200 bg-gray-700 shadow-lg 
                                md:overflow-hidden overflow-auto md:hover:overflow-auto`}>

            <div className={`absolute top-2 right-2`}>

                {activeSidebar
                && (<button type="button"
                            onClick={() => setActiveSidebar(!activeSidebar)}
                            className={`inline-flex items-center justify-center p-2 rounded-full text-gray-400 
                            hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-inset 
                            focus:ring-white`}
                            aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open Sidebar menu</span>
                    <AiOutlineClose size={'24px'} className={'block h-6 w-6'}/>
                </button>)}

            </div>
            <nav className={'mt-20'}>
                {
                    links.map(t=> {
                        return(
                            <>
                                <p key={t.title} className={`${!activeSidebar && 'invisible lg:visible' } text-gray-300 m-3 uppercase`}>{t.title}</p>
                                {t.links.map(l => {
                                    return (
                                        <a key={l.href} className={linkStyle} href='#'>
                                            {l.icon}
                                            <span key={l.text} className={`${textStyle}`}>{l.text}</span>
                                        </a>
                                    )
                                })}
                            </>
                        )
                    })
                }
            </nav>
        </div>
    );
}

export default Sidebar;