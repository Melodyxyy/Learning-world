// CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <a href={course.link} target="_blank" rel="noopener noreferrer">
        Learn More
      </a>
    </div>
  );
};

export default CourseCard;
