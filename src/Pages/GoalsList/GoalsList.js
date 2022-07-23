import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {fetchGoals} from "../../Features/goals/goalsSlice";

function GoalsList(){

    const goals = useSelector(state => state.goals);
    const dispatch = useDispatch();

    useEffect(() => {

        console.log('useEffect')
        if (goals.goalsList.length === 0){
            console.log('SERVER REQUEST')
            dispatch(fetchGoals())
        }

    }, []);

    const redirect = useNavigate();
    const openGoalId = (goal_id) => {
        redirect(`/goal/${goal_id}`);
    }

    return(
        <>
            <header className={'bg-white shadow mt-16 md:mt-0'}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center text-blue">Goals List</h1>
                </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    {goals.loading && (<p className={'text-center'}>Loading...</p>)}
                    {!goals.loading && goals.error ? <p className={'text-center font-bold text-red text-3xl'}>{goals.error}</p> : ''}
                    <div className="px-4 py-6 sm:px-0 grid gap-5 grid-cols-1 lg:grid-cols-2">
                        {
                            !goals.loading && goals.goalsList.length
                                ? goals.goalsList.map(g => {
                                let title = g.title.substring(0,42);
                                title += g.title.length > 45 ? '...' : '';

                                let desc = g.description.substring(0,150);
                                desc += g.description.length > 150 ? '...' : '';

                                return (
                                    <div key={g.id}
                                         onClick={() => openGoalId(g.id)}
                                         className={'w-full h-fit cursor-pointer shadow hover:shadow-lg rounded-md bg-white'}>

                                        {/*Header*/}
                                        <div className={'bg-light-gray border-b rounded-t py-3'}>
                                            <h3 className={'text-dark-blue text-2xl font-extrabold text-center mx-2'}>{title}</h3>
                                        </div>

                                        {/*Progress bar*/}
                                        <div className={'m-3'}>

                                            <div className={'flex justify-between'}>
                                                <span className={'text-sm text-secondary-gray '}>Progress:  {g.progress}%</span>
                                                <span className={'text-sm text-secondary-gray italic'}>{g.createdOn} - {g.dueDate}</span>
                                            </div>

                                            <div className={'bg-light-blue w-full h-2 rounded-full mt-1'}>
                                                <div className={'bg-blue h-2 rounded-full'} style={{width:`${g.progress}%`}}> </div>
                                            </div>
                                        </div>
                                        {/*Body*/}
                                        <div className={'m-5'}>
                                            <p className={'text-secondary-gray'} >{desc}</p>
                                        </div>
                                        {/*Footer*/}
                                        <div className={'flex justify-between flex-wrap items-center border-t-1 mx-3 my-3'}>

                                    <span className={'text-sm text-secondary-gray bg-light-gray py-2 px-3 border shadow'}>
                                        Days Left: <strong>3</strong> days
                                    </span>
                                            <span className={'text-sm text-secondary-gray bg-light-gray py-2 px-3 border shadow'}>
                                        Today's Target: <strong>{g.progress}%</strong>
                                    </span>
                                        </div>

                                    </div>
                                )

                            }) : ''
                        }


                    </div>
                </div>
            </main>
        </>
    );
}
export default GoalsList;