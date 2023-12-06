import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatorPage from './CreatorPage';
import RecommendedCourses from './RecommendedCourses';
import TaskManager from './TaskManager';
import { useAuth } from '../AuthContext';

import '../UserProfile.css';

const UserProfile = ({ user, learnedCourses, creatorCourses, allCourses, tasks, setTasks }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  console.log(user); // Add this line for debugging

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="user-profile">
      <h2>{user ? `${user.name}'s Profile` : 'User Profile'}</h2>

      {/* 显示用户信息 */}
      <div>
        <strong>Email:</strong> {user ? user.email : ''}
      </div>
      <div>
        <h3>Learned Courses:</h3>
        <ul>
          {learnedCourses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>

      {/* 显示 CreatorPage 组件 */}
      <CreatorPage creatorCourses={creatorCourses} />

      {/* 使用 RecommendedCourses 组件显示推荐的课程 */}
      <RecommendedCourses learnedCourses={learnedCourses} allCourses={allCourses} />

      <div className="task-manager">
        {/* 使用 TaskManager 组件管理任务 */}
        {/* 将 tasks、setTasks、addTask、deleteTask 和 editTask 传递给 TaskManager 组件 */}
        <TaskManager tasks={tasks} setTasks={setTasks} addTask={addTask} deleteTask={deleteTask} editTask={editTask} />
      </div>

      {/* 注销按钮 */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
