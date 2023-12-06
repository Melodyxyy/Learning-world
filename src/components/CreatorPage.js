// CreatorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

const CreatorPage = ({ creatorCourses }) => {
  return (
    <div className="creator-page">
      <h2>Your Created Courses</h2>
      {creatorCourses.map((course) => (
        <Link key={course.id} to={`/courses/${course.id}`}>
          {/* Use Link to navigate to CourseDetailPage */}
          <CourseCard course={course} />
        </Link>
      ))}
    </div>
  );
};

export default CreatorPage;
