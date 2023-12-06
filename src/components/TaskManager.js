import React, { useState } from 'react';

const TaskManager = ({ tasks, addTask, deleteTask, editTask }) => {
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask({ id: tasks.length + 1, name: newTask });
      setNewTask('');
    }
  };

  const handleEditTask = () => {
    if (editedTaskName.trim() !== '' && editingTaskId !== null) {
      editTask(editingTaskId, editedTaskName);
      setEditingTaskId(null);
      setEditedTaskName('');
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setEditingTaskId(null);
    setEditedTaskName('');
  };

  const startEditing = (taskId, taskName) => {
    setEditingTaskId(taskId);
    setEditedTaskName(taskName);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskName('');
  };

  // 英文学习或工作任务的可选项列表
  const predefinedTasks = [
    'Learn React',
    'Read a Book',
    'Write Code for Project',
    'Attend Meeting',
    'Complete Assignment',
    'Exercise',
    'Review Vocabulary',
  ];

  return (
    <div>
      <h2>Task Manager</h2>
      <div>
      <label htmlFor="newTask">Add a Task:</label>
      <span className="button-gap"></span>
        <input type="text" id="newTask" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <span className="button-gap"></span>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul style={{ listStyleType: 'none' }}>
        {tasks &&
          tasks.map((task, index) => (
            <li key={task.id}>
              {editingTaskId === task.id ? (
                <div className="task-editing">
                  <input
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <button onClick={handleEditTask}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </div>
              ) : (
                <div className="task-buttons">
                  {index + 1}. {task.name}
                  <span className="button-gap"></span>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  <span className="button-gap"></span>
                  <button onClick={() => startEditing(task.id, task.name)}>Edit</button>
                </div>
              )}
            </li>
          ))}
      </ul>
      <div>
        <p>Choose from predefined tasks or add your own:</p>
        <select onChange={(e) => setNewTask(e.target.value)}>
          <option value="">Select a predefined task</option>
          {predefinedTasks.map((task, index) => (
            <option key={index} value={task}>
              {task}
            </option>
          ))}
        </select>

        <span className="button-gap"></span>
        <button onClick={handleAddTask}>Add Selected Task</button>
      </div>
    </div>
  );
};

export default TaskManager;
