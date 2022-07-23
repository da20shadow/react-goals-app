import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {fetchTasks,addedTask,deletedTask} from "../../Features/tasks/tasksSlice";
import {fetchGoals} from "../../Features/goals/goalsSlice";
import {addTaskByGoalId, deleteTaskById} from "../../Services/TaskService";
import {BsTrash} from 'react-icons/bs';
import {GoPlus} from "react-icons/go";
import AddTask from "./Components/AddTask";

function Goal() {
    const [showModal, setShowModal] = useState(false);
    const [goalProgress, setGoalProgress] = useState(0);
    const {goal_id} = useParams();
    const user = useSelector(state => state.user.value);
    const goals = useSelector(state => state.goals);
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        if (goals.goalsList.length === 0){
            dispatch(fetchGoals());
        }
        if (tasks.tasksList.length === 0) {
            dispatch(fetchTasks());
        }
    }, []);

    const [goal,setGoal] = useState({});
    const [goalTasks,setGoalTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);
    useEffect(() => {
        if (goals.goalsList.length > 0){
            const currentGoal = goals.goalsList.find(g => g.id === Number(goal_id));
            setGoal(currentGoal);
        }
        if (tasks.tasksList.length > 0){
            const tasksInProgress = [];
            const completedTasks = [];
            tasks.tasksList.forEach(t => {
                if (t.goalId === Number(goal_id)){
                    console.log('status: ', t.status)
                    if (t.status !== 4){
                        tasksInProgress.push(t);
                    }else if (t.status === 4){
                        completedTasks.push(t);
                    }
                }
            });
            setGoalTasks(tasksInProgress);
            setCompletedTasks(completedTasks);
            setGoalProgress(50); //TODO: calculate it!
        }
    },[goals.goalsList,tasks.tasksList])

    const addTask = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title');

        if (!title){
            alert('Title can not be empty!');
            return;
        }
        const desc = formData.get('description');
        addTaskByGoalId(title,user.token, goal_id,desc)
            .then(res => {
                console.log(res)
                const task = res.task;
                dispatch(addedTask(task));
                setShowModal(false);
            })
            .catch(err => {
                console.log(err)
            })
        e.currentTarget.title.value = ''
    }
    const deleteTask = (taskId) => {
        console.log(taskId)
        const token = user.token;
        deleteTaskById(token, taskId)
            .then(res =>{
                console.log(res)
                dispatch(deletedTask(taskId));
            }).catch(err => {
            console.log(err)
        });
    }

    return (
        <>

            <header className={'bg-white shadow mt-16 md:mt-0'}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center text-blue">
                        <span className={'font-extrabold text-orange'}>GOAL:</span> {goal.title}</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                <div className={'flex justify-between'}>
                    <span className={'bg-light-blue'}>{goalProgress}%</span>
                    <span>{goal.createdOn} - </span>
                    <span>{goal.dueDate}</span>
                </div>

                <div className="px-4 py-6 sm:px-0">
                    {/*//TODO: to make it p and after click to transform to textarea and ready for changes! */}
                    <textarea className="border-4 border-dashed border-gray-200 rounded-lg p-3 w-full h-fit ring-none outline-none"
                              name="description" defaultValue={goal.description}/>

                </div>

                <div className={'mt-4'}>
                    <h2 className={'text-center text-2xl font-bold'} >Weekly Sub-Goals</h2>

                    <div className={'mt-5'}>
                        <div className={'grid mx-auto'}>

                            <div className={'grid grid-cols-4'}>
                                <h3 className="text-center">Title</h3>
                                <h3 className="text-center">Status</h3>
                                <h3 className="text-center">Due Date</h3>
                                <h3 className="text-end">Action</h3>
                            </div>


                            {/*TODO: Each next will be in status Coming Soon!
                            TODO: To calculate the dates automatically recognize the weeks!*/}
                            {tasks.loading && (<p className={'text-center'}>Loading...</p>)}
                            {!tasks.loading && tasks.error ? (<p className={'text-center'}>Loading...</p>) : ''}
                            {!tasks.loading && tasks.tasksList.length > 0 ? (
                                goalTasks.map(t => {
                                    return (
                                        <div key={t.id} className={'flex justify-between border'}>
                                            <span className={'p-2'}>G: {t.goalId} - ID: {t.id} - {t.title}</span>
                                            <span className={'p-2'}>Coming Soon...</span>
                                            <span className={'p-2'}>{t.createdOn} - {t.dueDate}</span>
                                            <span onClick={() => deleteTask(t.id)}
                                                className={`p-2 cursor-pointer toDel${t.id}`}>
                                                <BsTrash color={'darkred'}/>
                                            </span>
                                        </div>
                                    )
                                })
                            ): ''}

                        </div>
                    </div>
                </div>
                <div className={'mt-10'}>
                    <h3 className="text-center text-2xl font-bold">COMPLETED</h3>
                    <div className={'flex justify-between'}>
                        <h3>Title</h3>
                        <h3>Status</h3>
                        <h3>Due Date</h3>
                    </div>
                    <div className={'flex justify-between'}>
                        {
                            completedTasks && completedTasks.map(t => {
                                return (
                                    <div key={t.id}>
                                    <p>{t.title}</p>
                                    <p>{t.status}</p>
                                    <p>{t.dueDate}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </main>

            {/*Add New Task Sticky Button*/}
            <div className="fixed bg-blue text-light-gray hover:bg-light-blue hover:text-blue p-2 cursor-pointer border rounded-full right-5 bottom-10"
                 style={{zIndex: '1000'}}
                 onClick={() => setShowModal(!showModal)}>
                <GoPlus
                    size={'34px'}
                />
            </div>
            {
                showModal && (
                <div className={'fixed z-10 pt-28 w-full h-full top-0 left-0 overflow-auto bg-half-transparent'}>
                    <AddTask showModal={showModal} setShowModal={setShowModal} addTask={addTask} />
                </div>
                )
            }
        </>
    );
}

export default Goal;