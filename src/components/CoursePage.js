// CoursePage.js
import React from 'react';

const CoursePage = ({ course }) => {
  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {/* 其他课程内容 */}
    </div>
  );
};

export default CoursePage;
