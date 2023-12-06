// CourseDetailPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseDetail from '../components/CourseDetail';
import CommentForm from '../components/CommentForm';

const CourseDetailPage = ({ courses, addComment }) => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === parseInt(courseId));
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddComment = () => {
    // Validate comment and rating before adding
    if (comment.trim() !== '' && rating > 0 && rating <= 5) {
      // Add the comment to the course
      addComment(courseId, { text: comment, rating });
      // Clear the form
      setComment('');
      setRating(0);
    }
  };

  return (
    <div className="course-detail">
      {course ? (
        <>
          <h2>{course.title}</h2>
          <p className="course-description">{course.description}</p>

          {/* Styled Course Content */}
          <div className="styled-course-content">
            <h3>How does React Work?</h3>
            <p>
              React creates a <strong>virtual DOM</strong> in memory. Instead of manipulating the
              browser's DOM directly, React creates a virtual DOM in memory, where it does all the
              necessary manipulating, before making the changes in the browser DOM. React only
              changes what needs to be changed. React finds out what changes have been made, and
              changes only what needs to be changed.
            </p>

            <h3>React.JS History</h3>
            <p>
              Current version of React.JS is <strong>V18.0.0 (April 2022)</strong>. Initial
              Release to the Public (<strong>V0.3.0</strong>) was in July 2013. React.JS was first
              used in 2011 for Facebook's Newsfeed feature. Facebook Software Engineer, Jordan
              Walke, created it. Current version of create-react-app is{' '}
              <strong>v5.0.1 (April 2022)</strong>. create-react-app includes built tools such as
              webpack, Babel, and ESLint.
            </p>
          </div>

          {/* Comments Section */}
          <h3>Comments:</h3>
          {course.comments && course.comments.length > 0 ? (
            <ul>
              {course.comments.map((comment, index) => (
                <li key={index}>
                  <strong>User:</strong> {comment.text} (Rating: {comment.rating})
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          {/* Add Comment Form */}
          <div className="add-comment-form">
            
            <input
              type="text"
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </>
      ) : ( <div className="styled-course-content">
      <h3>How does React Work?</h3>
      <p>
        React creates a <strong>virtual DOM</strong> in memory. Instead of manipulating the
        browser's DOM directly, React creates a virtual DOM in memory, where it does all the
        necessary manipulating, before making the changes in the browser DOM. React only
        changes what needs to be changed. React finds out what changes have been made, and
        changes only what needs to be changed.
      </p>

      <h3>React.JS History</h3>
      <p>
        Current version of React.JS is <strong>V18.0.0 (April 2022)</strong>. Initial
        Release to the Public (<strong>V0.3.0</strong>) was in July 2013. React.JS was first
        used in 2011 for Facebook's Newsfeed feature. Facebook Software Engineer, Jordan
        Walke, created it. Current version of create-react-app is{' '}
        <strong>v5.0.1 (April 2022)</strong>. create-react-app includes built tools such as
        webpack, Babel, and ESLint.
      </p>
    </div>
)}
    </div>
  );
};

export default CourseDetailPage;
