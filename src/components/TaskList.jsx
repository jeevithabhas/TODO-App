import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDeleteTask, onToggleTaskCompletion, onUpdateTaskTitle }) {
  return (
    <ul className="mt-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTaskCompletion={onToggleTaskCompletion}
          onUpdateTaskTitle={onUpdateTaskTitle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
