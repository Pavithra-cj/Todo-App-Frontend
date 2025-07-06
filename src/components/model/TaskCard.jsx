import React from 'react'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'

const TaskCard = ({ task, onEdit, onComplete, onDelete }) => {
    const confirmDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(task.id);
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        });
    };

  return (
    <div className='bg-white p-4 shadow rounded flex justify-between items-start'>
        <div>
            <h3 className='font-semibold text-lg'>
                {task.title}
            </h3>
            <p className='text-gray-600'>{task.description}</p>
        </div>
        <div className='flex gap-2 text-lg mt-1'>
            <button onClick={() => onEdit(task)} className='text-yellow-500'>
                <Icon icon="mdi:pencil" />
            </button>
            <button onClick={() => onComplete(task.id)} className='text-green-600'>
                <Icon icon="mdi:check-circle" />
            </button>
            <button onClick={confirmDelete} className='text-red-600'>
                <Icon icon="mdi:delete" />
            </button>
        </div>
    </div>
  )
}

export default TaskCard