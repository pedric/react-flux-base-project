import React, { useState, useEffect } from 'react';
import CourseForm from '../components/CourseForm';
import courseStore from '../stores/courseStores';
import * as courseActions from '../actions/courseActions';
import { toast } from 'react-toastify';

const Course = (props) => {

  const slug = props.match.params.slug;

  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  const onChange = () => {
    setCourses(courseStore.getCourses());
  }

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if(courses.length === 0){
      courseActions.loadCourses();
    } else if(slug){
      setCourse(courseStore.getCourseBySLug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  },[courses.length, slug]);

  const handleChange = ({ target }) => {
    const updatedCourse = { ...course, [target.name]: target.value};
    setCourse(updatedCourse);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
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