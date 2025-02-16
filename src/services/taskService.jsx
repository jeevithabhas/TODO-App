const API_URL = 'https://to-do-backend-ooun.onrender.com/api/tasks';

const taskService = {
  getTasks: async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map(task => ({
      ...task,
      completed: task.completed || false,
      category: task.category || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || ''
    }));
  },
  createTask: async (task) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return {
      ...data,
      completed: data.completed || false,
      category: data.category || '',
      priority: data.priority || 'medium',
      dueDate: data.dueDate || ''
    };
  },
  deleteTask: async (taskId) => {
    await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });
  },
  toggleTaskCompletion: async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}/toggle`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return {
      ...data,
      completed: data.completed || false,
      category: data.category || '',
      priority: data.priority || 'medium',
      dueDate: data.dueDate || ''
    };
  },
  updateTaskTitle: async (taskId, title) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();
    return data;
  }
};

export default taskService;
