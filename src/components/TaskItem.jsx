import React, { useState } from 'react';
import { PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';

function TaskItem({ task, onDeleteTask, onToggleTaskCompletion, onUpdateTaskTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdateTaskTitle(task._id, newTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  if (!task || typeof task.completed === 'undefined') {
    return null;
  }

  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500',
  };

  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '';

  return (
    <li className="flex flex-wrap justify-between items-center bg-gray-700 p-4 mb-2 rounded-lg shadow-md hover:shadow-xl">
      <div className="checkbox flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTaskCompletion(task._id)}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-gray-700 text-white"
          />
        ) : (
          <span
            className={`task-title ${task.completed ? 'line-through text-green-500' : ''} cursor-pointer`}
            onClick={() => onToggleTaskCompletion(task._id)}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {task.category && <span className="category">{task.category}</span>}
        {formattedDueDate && <span className="due-date">{formattedDueDate}</span>}
        <span className={`priority ${priorityColors[task.priority]}`}>{task.priority}</span>
        {isEditing ? (
          <button className="edit" onClick={handleUpdate}>
            <CheckCircleIcon className="w-6 h-6" />
          </button>
        ) : (
          <button className="edit" onClick={handleEdit}>
            <PencilIcon className="w-6 h-6" />
          </button>
        )}
        <button className="delete" onClick={() => onDeleteTask(task._id)}>
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
