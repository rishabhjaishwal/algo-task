import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Twitt extends Component {
    constructor(props) {
        super(props);
        
      }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
           { console.log(this.props.id.created_at)}
            <h1>twitter data</h1>
            <h3>{this.props.id.text}</h3>
            <p>{this.props.id.id}</p>
            <p>{this.props.id.created_at}</p>
        </div>
    )
  }
}