// CourseListPage.js
import React from 'react';
import CourseList from '../components/CourseList'; // 使用正确的相对路径
import courses from '../data'; // 使用正确的相对路径

const CourseListPage = ({ category }) => {
  // Find the category in the courses data
  const categoryData = courses.find((c) => c.title === category) || { courses: [] };

  return (
    <div>
      <h2>{category}</h2>
      <CourseList courses={categoryData.courses} selectedCategory={category} />
    </div>
  );
};

export default CourseListPage;
