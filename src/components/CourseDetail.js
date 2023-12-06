// CourseDetail.js
import React from 'react';

const CourseDetail = ({ course }) => {
  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <a href={course.link} target="_blank" rel="noopener noreferrer">
        Go to Course
      </a>
    </div>
  );
};

export default CourseDetail;
