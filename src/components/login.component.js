import React, { Component } from 'react';
import axios from 'axios';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


// import Index from './index.component';
import Twitpage from './twitter.component';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
        password: e.target.value
    })  
  }
  
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post('business/login', obj)
        .then(res => {console.log(res);console.log(res.data.status);
        if(res.data.status==="success")
        {
          ReactDOM.render(
            <BrowserRouter>
            <Twitpage></Twitpage>
            </BrowserRouter>, document.getElementById('root'));
        }else{alert("Incorrect User Id Password")}
        
        });
     //   .catch(function(error){console.log(error+"hello boss")});


    this.setState({
      username: '',
        password: '',
     
    })
    
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">LOGIN <span className="badge badge-primary">FORM</span></h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>USER NAME:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                </div>
                
                <div className="form-group">
                    <input type="submit" 
                      value="Login" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}