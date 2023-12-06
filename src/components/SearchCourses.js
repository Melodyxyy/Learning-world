import React, { useState } from 'react';
import courses from '../data';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const MainCategoryLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const SubCategoryLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: normal;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchCourses = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false);

  const handleSearch = () => {
    const filteredData = courses.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.courses &&
        item.courses.some((subCourse) =>
          subCourse.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );
    setSearchResults(filteredData);
    onSearch(filteredData);
    setIsSearchExecuted(true);
  };

  return (
    <Container>
      Search Courses:
      <span className="button-gap"></span>
      <input
        type="text"
        placeholder="Enter course title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className="button-gap"></span>
      <button onClick={handleSearch}>Search</button>

      {isSearchExecuted && searchResults.length > 0 ? (
        <List>
          <h2>Search Results:</h2>
          {searchResults.map((result) => (
            <ListItem key={result.id}>
              {result.courses ? (
                <div>
                  <MainCategoryLink to={`/courses/${result.id}`}>
                    {result.title}
                  </MainCategoryLink>
                  <ul>
                    {result.courses.map((subCourse) => (
                      <ListItem key={subCourse.id}>
                        <SubCategoryLink to={`/courses/${subCourse.id}`}>
                          {subCourse.name}
                        </SubCategoryLink>
                      </ListItem>
                    ))}
                  </ul>
                </div>
              ) : (
                <MainCategoryLink to={`/courses/${result.id}`}>
                  {result.title}
                </MainCategoryLink>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        isSearchExecuted && <p>No search results</p>
      )}
    </Container>
  );
};

export default SearchCourses;
