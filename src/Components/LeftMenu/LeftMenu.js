import {GiStairsGoal, GiTomato} from "react-icons/gi";
import {AiOutlineCalendar, AiOutlineFire, AiOutlineSetting, AiOutlineUser, AiOutlineClose} from "react-icons/ai";
import {FaMoneyBillWave, FaRegLightbulb} from "react-icons/fa";
import {BsClock,BsListCheck} from "react-icons/bs";
import {MdWorkOutline} from "react-icons/md";
import {useStateContext} from "../../Contexts/ContextProvider";
import {Link, NavLink} from "react-router-dom";

function LeftMenu() {
    const {activeSidebar, setActiveSidebar, screenSize} = useStateContext();

    const links = [
        {
            title: 'Goals', links: [
                {icon: <GiStairsGoal/>, name: 'All Goals', href: 'goals'},
                {icon: <FaMoneyBillWave/>, name: 'Financial Goals', href: 'financial-goals'},
                {icon: <AiOutlineUser/>, name: 'Personal Goals', href: 'personal-goals'},
            ]
        },
        {
            title: 'Tasks', links: [
                {icon: <BsListCheck/>, name: 'All Tasks', href: 'tasks'},
                {icon: <AiOutlineFire/>, name: 'Urgent Tasks', href: 'urgent-tasks'},
                {icon: <AiOutlineCalendar/>, name: 'Planned Tasks', href: 'planned-tasks'},
                {icon: <BsClock/>, name: 'Unplanned Tasks', href: 'unplanned-tasks'},
            ]
        },
        {
            title: 'Ideas', links: [
                {icon: <FaRegLightbulb/>, name: 'All Ideas', href: 'ideas'},
                {icon: <MdWorkOutline/>, name: 'Business Ideas', href: 'business-ideas'},
                {icon: <FaRegLightbulb/>, name: 'Other Ideas', href: 'other-ideas'},
            ]
        },
        {
            title: 'Pomodoro', links: [
                {icon: <GiTomato/>, name: 'Pomodoro History', href: 'pomodoro'},
                {icon: <AiOutlineSetting/>, name: 'Pomodoro Settings', href: 'pomodoro-settings'},
            ]
        },
    ];

    const handleCloseSideBar = () => {
        if (activeSidebar !== undefined && screenSize <= 900) {
            setActiveSidebar(false);
        }
    };

    const activeLink = 'flex items-center gap-5 pl-5 py-2 rounded-lg text-md text-dark-blue bg-light-blue m-1';
    const normalLink = 'flex items-center gap-5 pl-5 py-2 rounded-lg text-md text-gray hover:bg-light-blue dark:text-light-gray dark:hover:text-black m-1';

    return (
        <section className="z-50 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">

            {
                activeSidebar && (
                    <>

                        <div className="flex justify-between items-center">

                            {/*Logo*/}
                            <Link to="/" onClick={handleCloseSideBar}
                                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-dark-blue">
                                <span>GoalsApp</span>
                            </Link>

                            {/*Close Button*/}
                            <button type="button"
                                    onClick={() => setActiveSidebar(!activeSidebar)}
                                    className="text-xl border rounded-full p-1 hover:bg-light-gray mt-4 mr-2 sm:block hidden"
                            >
                                <AiOutlineClose/>
                            </button>
                        </div>

                        <nav className={'mt-10'}>

                            {links.map(item => {

                                return (
                                    <div key={item.title}>

                                        <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                                            {item.title}
                                        </p>

                                        {item.links.map((link) => (
                                            <NavLink
                                                to={`/${link.href}`}
                                                key={link.href}
                                                onClick={handleCloseSideBar}
                                                className={({isActive}) => (isActive ? activeLink : normalLink)}
                                            >
                                                {link.icon}
                                                <span className="capitalize ">{link.name}</span>
                                            </NavLink>
                                        ))}

                                    </div>
                                )

                            })
                            }

                        </nav>

                    </>
                )
            }

        </section>
    );
}

export default LeftMenu;