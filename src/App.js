import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import Course from './pages/Course';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

const activeStyle = {
  color: 'purple'
}

const App = () => {
  return (
    <div className="container-fluid">
    <ToastContainer autoClode={2000} hideProgressBar/>
    <Header />
    <Router>
      <nav>
        <ul>
          <li><NavLink to="/" activeClassName="active" activeStyle={activeStyle} exact>Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active" activeStyle={activeStyle}>About</NavLink></li>
          <li><NavLink to="/courses" activeClassName="active" activeStyle={activeStyle}>Courses</NavLink></li>
          <li><NavLink to="/course" activeClassName="active" activeStyle={activeStyle}>Add new Course</NavLink></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Redirect from="/start" to ="/" />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={Course} />
        <Route path="/course" component={Course} />
        <Route component={PageNotFoundPage} />
      </Switch>
    </Router>
    </div>
  )
}
 
export default App;

/* FLUX 
5 functions
 - register(cb)
 - unregister(string id)
 - waitFor(arr string ids)
 - dispatch(obj payload)
 - isDispatching(bool)





*/