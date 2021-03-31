import React from 'react';

const CourseForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <div className="field">
          <input
            id="title"
            type="text"
            name="title"
            className="form-control"
            value={props.course.title}
            onChange={props.onChange}
          />
          {props.errors.title && <div className="alert alert-danger">{props.errors.title}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            value={props.course.authorId || ''}
            className="form-control"
            onChange={props.onChange}
          >
            <option value="" />
            <option value="1">Cory House</option>
            <option value="2">Scott Allen</option>
          </select>
          {props.errors.authorId && <div className="alert alert-danger">{props.errors.authorId}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <div className="field">
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={props.course.category}
            onChange={props.onChange}
          />
          {props.errors.category && <div className="alert alert-danger">{props.errors.category}</div>}
        </div>
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}
 
export default CourseForm;