import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

function AddTaskForm({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({ title: taskTitle, category, priority, dueDate, completed: false });
      setTaskTitle('');
      setCategory('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 mb-6">
      <div className="flex">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Write your next task"
          className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white"
        />
        <button type="submit" className="p-2 rounded-r-lg bg-green-500 text-white hover:bg-green-600 flex items-center">
          <PlusCircleIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="flex-grow p-2 bg-gray-800 text-white rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-grow p-2 bg-gray-800 text-white rounded"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="flex-grow p-2 bg-gray-800 text-white rounded"
        />
      </div>
    </form>
  );
}

export default AddTaskForm;
