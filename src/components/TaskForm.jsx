import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

const TaskForm = ({ isOpen, onClose, onSave, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Title is required!',
            });
            return;
        }
        
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: taskToEdit ? 'Update this task?' : 'Create a new task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'No, cancel!'
        });

        if (confirm.isConfirmed) {
            const task = { title, description };
            if (taskToEdit) {
                task.id = taskToEdit.id; 
            }
            onSave(task);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: taskToEdit ? 'Task updated successfully!' : 'Task created successfully!',
            });
            onClose();
        } else {
            Swal.fire('Cancelled', 'Your task was not saved.', 'info');
        }
    };

    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20'>
        <div className='bg-white p-6 rounded w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>{taskToEdit ? 'Update Task' : 'Add New Task'}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    className='w-full border p-2 rounded' 
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    className='w-full border p-2 rounded'
                    rows="4"
                />
                <div className='flex justify-end gap-3'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-4 py-2 bg-gray-300 rounded'>
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-blue-600 text-white rounded'>
                        {taskToEdit ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TaskForm