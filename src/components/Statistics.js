// Statistics.js
import React from 'react';

const Statistics = ({ totalCourses, totalUsers }) => {
  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <p>Total Courses: {totalCourses}</p>
      <p>Total Users: {totalUsers}</p>
      {/* 可以根据需要添加其他统计信息 */}
    </div>
  );
};

export default Statistics;
