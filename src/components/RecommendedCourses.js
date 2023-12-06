// RecommendedCourses.js
import React from 'react';
import CourseCard from './CourseCard';

const RecommendedCourses = ({ learnedCourses, allCourses }) => {
  // Calculate similarity between courses based on their categories
  const calculateSimilarity = (firstCourse, secondCourse) => {
    // You can use a more complex similarity calculation here
    return firstCourse.category === secondCourse.category;
  };

  // Recommend courses based on the user's learning history
  const recommendCourses = () => {
    const recommendedCourses = [];

    if (!allCourses || allCourses.length === 0) {
      return recommendedCourses;
    }

    learnedCourses.forEach((learnedCourse) => {
      // Find courses similar to the learned course
      const similarCourses = allCourses.filter((course) => calculateSimilarity(learnedCourse, course));

      // Recommend courses that the user has not learned yet
      const newRecommendedCourses = similarCourses.filter((course) => !learnedCourses.some((learned) => learned.id === course.id));

      recommendedCourses.push(...newRecommendedCourses);
    });

    // Remove duplicates
    return Array.from(new Set(recommendedCourses));
  };

  const recommendedCourses = recommendCourses();

  return (
    <div className="recommended-courses">
      <h3>Recommended Courses</h3>
      {recommendedCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default RecommendedCourses;
