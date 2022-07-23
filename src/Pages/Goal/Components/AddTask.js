import './AddTask.css';
function AddTask({showModal,setShowModal,addTask}){

    return (
        <div className={'addTaskModal relative bg-light-gray mx-auto p-0 border w-full md:w-10/12 shadow-xl rounded-lg'}>

            <div className={'relative py-3 px-10 bg-blue text-white text-2xl rounded-t-lg'}>
                <h2 className={'text-center'}>Add New Task</h2>
                <span className={'absolute top-1 right-5 cursor-pointer'}
                      onClick={() => setShowModal(!showModal)}>x</span>
            </div>

            <div className={'py-2 px-10'}>
                <form method={'post'} id={'newTaskForm'}
                      onSubmit={addTask}>
                    <input className={'border my-2 p-3 w-full rounded'}
                           name={'title'}
                           type="text"
                           placeholder={'Task title...'}/>
                    <textarea className={'w-full p-3 border rounded'}
                              name="description"
                              placeholder={'Task Description'} />
                </form>
            </div>

            <div className={'flex justify-end bg-blue text-white rounded-b-lg'}>
                <button className={'border hover:shadow whitespace-nowrap py-1 px-3 m-3 bg-white text-blue font-bold rounded-lg'}
                        form={'newTaskForm'}
                        type={'submit'} >Add Task</button>
            </div>

        </div>
    )
}
export default AddTask;