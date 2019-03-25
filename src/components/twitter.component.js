import React, { Component } from 'react';
import axios from 'axios';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Twitter from 'twitter';
import config from '../config.js'


import Index from './index.component';
import TableRow from './TableRow.js';
import Twitts from './TableRow.js';
import Login from './login.component.js';
export default class Twitpage extends Component {

constructor(){
    super();
    this.Client = new Twitter(config);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
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
    axios.post('business/tweet', obj)
        .then(res => {console.log(res);
       var result=res.data.statuses;
          ReactDOM.render(
            <BrowserRouter>
            <div>
            <Twitpage></Twitpage>
            <Twitts key={result.id} id={result} datem={this.state.password}></Twitts></div>
            </BrowserRouter>, document.getElementById('root'));
        
        
        });
     //  .catch(function(error){console.log(error+"hello boss")});


    this.setState({
      username: '',
        password: '',
     
    })
    
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }} className="container">
            <h3 align="center">Twitts search <span className="badge badge-primary">FORM</span></h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Keyword:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                </div>
                <div className="form-group">
                    <label hidden>Date: </label>
                    <input type="date" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                     hidden />
                </div>
                
                <div className="form-group">
                    <input type="submit" 
                      value="search" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}