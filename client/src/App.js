import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Details} path="/course-detail" />
        <Route path="/" component={CourseList}/>
      </Switch>
    </Router>
  );
}

class CourseList extends React.Component {
  state = {
    courses: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch('/courses')
      .then(checkStatus)
      .then((resp) => resp.text())
      .then(resp => {
        let data = resp.split("\n");
        console.log(data);
        this.setState({courses: data});
      })
      .catch(() => {
        console.error("errors");
      });
  }

  editSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  dynamicSearch = () => {
    return this.state.courses.filter(course => course.toString().toLowerCase().includes(this.state.searchTerm.toString().toLowerCase()))
  }

  render() {
    return (
      <div>
        <h1>Rate My Course</h1>
        <input type= 'text' value = {this.state.searchTerm} onChange = {this.editSearchTerm} placeholder = 'Search for a course!'/>
        <CourseContainer courses = {this.dynamicSearch()}/>
      </div>
    )
  }
}

class CourseContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.courses.map((course, index) => <Course key = {index} course = {course}/>)}
      </div>
    )
  }
}

class Course extends React.Component {
  render() {
    return (
      <div>
      <Link to={"/course-detail/"+this.props.course}>
        {this.props.course}
      </Link>
      </div>
    )
  }
}

function Details() {
  let match = useRouteMatch();
  return (
      <Switch>
        <Route component={CourseDetail} path={`${match.path}/:name`} />
        <Route path={match.path}>
          <h3>Please select a course.</h3>
        </Route>
      </Switch>
  );
}

class CourseDetail extends React.Component {
  render() {
    return (
      <div>
        <Form />
      </div>
    )
  }
}

class Form extends React.Component {
  render() {
    return (
      <form id="input-form">
        <div>
          <label for="course-num">Course Number: </label>
          <input id="course-num-input" type="text" name="course" required />
        </div>
        <div>
          <label for="comment-input">Comment: </label>
          <input id="comment-input" type="comment" name="comment" required />
        </div>
        <button id="submit-btn">submit</button>
      </form>
    )
  }
}

function checkStatus(response) {
  if (!response.ok) {
    throw Error("Error in request: " + response.statusText);
  }
  return response;
}

export default App;
