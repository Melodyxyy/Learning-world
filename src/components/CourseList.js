// CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import data from '../data';

const CourseList = ({ selectedCategory, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');

  useEffect(() => {
    // Filter courses based on the search term
    const filteredBySearch = data
      .flatMap((category) =>
        category.courses.filter((course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.name.charAt(0).toLowerCase() === searchTerm.toLowerCase()
        )
      )
      .filter((course) => course); // Remove undefined values
    setFilteredCourses(filteredBySearch);
  }, [searchTerm]);

  const handleSearchReset = () => {
    setSearchTerm('');
  };

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    onCategoryChange(mainCategory);
  };

  return (
    <div className="course-list">
      <div className="filter-and-search">
        {/* Category filter */}
        <div className="category-filter">
          <label>Filter by Main Category:</label>
          <span className="button-gap"></span>
          <select onChange={(e) => handleMainCategoryClick(e.target.value)}>
            <option value="">All Main Categories</option>
            {data.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search input */}
        <div className="search-bar">
          <label>Search Courses:</label>
          <span className="button-gap"></span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter course title..."
          />
          <span className="button-gap"></span>
          <button onClick={handleSearchReset}>Reset</button>
        </div>
      </div>

      {/* Course List Section */}
      <div className="course-list-section">
        {/* Display filtered courses for the selected main category */}
        {filteredCourses
          .filter((course) => !selectedMainCategory || course.mainCategory === selectedMainCategory)
          .map((course) => (
            <CourseCard key={course.id} course={course}>
              <Link to={`/courses/${course.id}`}>
                {/* Use Link to navigate to CourseDetailPage */}
                Learn More
              </Link>
            </CourseCard>
          ))}
      </div>
    </div>
  );
};

export default CourseList;
