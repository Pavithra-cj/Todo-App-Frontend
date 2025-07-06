import React from 'react'
import TaskCard from './model/TaskCard'

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  return (
    <div className='space-y-4'>
        {tasks.map(task => (
            <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
            />
        ))}
    </div>
  )
}

export default TaskList