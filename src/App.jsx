import React, {useState, useEffect} from 'react'
import './App.css'
import { createTask, deleteTask, getTasks, updateTask } from './service/taskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (task) => {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, task);
    } else {
      await createTask(task);
    }
    setModalOpen(false);
    setTaskToEdit(null);
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleCompleteTask = async (id) => {
    await updateTask(id, { completed: true });
    fetchTasks();
  };

  return (
    <div className='max-w-xl mx-auto p-6 mt-10 bg-gray-50 shadow rounded'>
      <h1 className='text-3xl font-bold text-center text-indigo-600 mb-4'>📝 Todo List</h1>
      <div className='text-right mb-4'>
        <button onClick={()=> {
          setTaskToEdit(null);
          setModalOpen(true);
        }}
        className='bg-indigo-600 text-white px-4 py-2 rounded'>
          Add Task
        </button>
      </div>
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />
      <TaskForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  )
}

export default App
