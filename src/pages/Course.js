import React, { useState, useEffect } from 'react';
import CourseForm from '../components/CourseForm';
import * as courseApi from '../api/courseApi';
import { toast } from 'react-toastify';

const Course = (props) => {

  const slug = props.match.params.slug;

  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    if(slug){
      courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
    }
  },[slug]);

  const handleChange = ({ target }) => {
    const updatedCourse = { ...course, [target.name]: target.value};
    setCourse(updatedCourse);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push('/courses');
      toast.success('Course saved');
    });
  }

  const formIsValid = () => {
    const _errors = {};
    if(!course.title) _errors.title = 'Title is required';
    if(!course.authorId) _errors.authorId = 'Author is required';
    if(!course.category) _errors.category = 'Category is required';
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }
  
  return (
  <>
    <h2>Manage course</h2>
    <div style={{textTransform: 'capitalize'}}>{slug ? slug.replace('-', ' ') : ''}</div>
    <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
  </>
  );
}
 
export default Course;