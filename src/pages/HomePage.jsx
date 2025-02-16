import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import taskService from '../services/taskService';
import ErrorBoundary from '../components/ErrorBoundary';
import { CheckCircleIcon, HeartIcon } from '@heroicons/react/24/solid';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', category: 'all' });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await taskService.getTasks();
        setTasks(fetchedTasks || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleTaskCompletion(taskId);
      setTasks(tasks.map((task) => task._id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleUpdateTaskTitle = async (taskId, title) => {
    try {
      const updatedTask = await taskService.updateTaskTitle(taskId, title);
      setTasks(tasks.map((task) => task._id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task title:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.status === 'pending' && task.completed) return false;
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    if (filter.category !== 'all' && task.category !== filter.category) return false;
    return true;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="task-box bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
        <header className="text-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-5xl font-bold">TODO</h1>
        </header>
        {completedTasks > 0 && (
          <section className="text-center mb-6">
            <HeartIcon className="w-10 h-10 text-green-500 mx-auto mb-2 animate-pulse" />
            <p className="text-xl font-bold">Task Done, Keep it up!</p>
            <div className="text-green-500 text-6xl">{completedTasks}/{totalTasks}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </section>
        )}
        <AddTaskForm onAddTask={handleAddTask} />
        <ErrorBoundary>
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onToggleTaskCompletion={handleToggleTaskCompletion}
            onUpdateTaskTitle={handleUpdateTaskTitle}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default HomePage;
