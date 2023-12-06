import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LinkList from './components/LinkList';
import SearchCourses from './components/SearchCourses';
import CourseDetailPage from './pages/CourseDetailPage';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './AuthContext';
import UserProfile from './components/UserProfile';
import CreatorPage from './components/CreatorPage';
import AdminDashboard from './components/AdminDashboard';
import AdminProfile from './components/AdminProfile';
import CourseList from './components/CourseList';
import courses from './data'; 
import TaskManager from './components/TaskManager';
import { NavLink, Navigate } from 'react-router-dom';

import './App.css';

function App() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [tasks, setTasks] = useState([]);

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

  const handleSearch = (results) => {
    console.log('Search results:', results);
    setSearchResults(results.length > 0 ? results : null);
  };

  return (
    <>
      <Router>
        <div className="App">
          <h1>Learning Platform</h1>
          <nav>
            <ul>
              <li>
                <NavLink to="/" className="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/TaskManager" className="active">
                  Task Manager
                </NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* 在整个页面顶部添加 SearchCourses 组件 */}
                  <SearchCourses onSearch={handleSearch} />
                  <LinkList />
                </>
              }
            />

            <Route path="/link-list" element={<LinkList />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage courses={courses} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {user && user.isAdmin ? (
              <>
                <Route path="/profile" element={<AdminProfile />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
              </>
            ) : (
              <Route
                path="/profile"
                element={
                  <UserProfile
                    user={user}
                    learnedCourses={courses.slice(0, 2)}
                    creatorCourses={courses.slice(2, 4)}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                }
              />
            )}

            <Route path="/creator" element={<CreatorPage creatorCourses={courses.slice(2, 4)} />} />
            <Route path="/course-list" element={<CourseList courses={courses} />} />

            <Route
              path="/TaskManager"
              element={
                <TaskManager
                  tasks={tasks}
                  setTasks={setTasks}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
