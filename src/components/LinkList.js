import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import courses from '../data'; 

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
  font-size: 18px;  /* 设置主题的字体大小 */

  &:hover {
    text-decoration: underline;
  }
`;

const SubCategoryLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: normal;
  font-size: 16px;  /* 设置子课程的字体大小 */

  &:hover {
    text-decoration: underline;
  }
`;

const LinkList = () => {
  return (
    <Container>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id}>
            {/* 使用嵌套路由 */}
            <MainCategoryLink to={`/courses/${course.id}`}>
              {course.title}
            </MainCategoryLink>
            <ul>
              {/* 显示该主题下的子课程链接 */}
              {course.courses.map((subCourse) => (
                <ListItem key={subCourse.id}>
                  <SubCategoryLink to={`/courses/${subCourse.id}`}>
                    {subCourse.name}
                  </SubCategoryLink>
                </ListItem>
              ))}
            </ul>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LinkList;
