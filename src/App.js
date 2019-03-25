import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Login from './components/login.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">AlgoScale Task</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/twitter'} className="nav-link">Twitter</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li> */}
              </ul>
            </div>
          </nav>
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route exact path='/login' component={ Index } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/' component={ Login } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
