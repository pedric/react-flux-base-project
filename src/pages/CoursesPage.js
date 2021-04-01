import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courseStore from '../stores/courseStores';
import { loadCourses } from '../actions/courseActions';

const CoursesPage = () => {

  const [courses, setCourses] = useState(courseStore.getCourses());

  const onChange = () => {
    setCourses(courseStore.getCourses());
  }

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if(courseStore.getCourses().length === 0) loadCourses();

    return () => {
      courseStore.removeChangeListener(onChange);
    }
  }, [])

  return (
  <>
  <h2>courses</h2>
  <Link className="btn btn-primary" to="/course">Add course</Link>
  <table className="table" style={{marginTop: '40px'}}>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author ID</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {
        courses &&
        courses.map((course,idx) => {
          return(
          <tr key={idx}>
            <td><Link to={`/course/${course.slug}`}>{course.title}</Link></td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
          </tr>
          )
        })
      }
    </tbody>
  </table>
  </>
  )
}

export default CoursesPage;