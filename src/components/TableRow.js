import React, { Component } from 'react';
export default class Twitts extends Component {
  constructor(props) {
      super(props);
      
     console.log(this.props.id[0].id);
      
    }
    
  // Render our tweets
  render(){
    
    // Build list items of single tweet components using map
        
          return (<div>{this.props.id.map((element,index)=>{   
            return <div className="container">
           
            <div className="card mt-2 p-2 border-primary border-5" style={{backgroundColor:element.user.profile_background_color}}>
            <div className="card-body">
              <h5 className="card-title text-primary ">Tweet Id: {element.id}</h5>
              <p className="card-title text-secondary ">Tweet By: {element.user.name}<span className="float-right">Retweet count: {element.retweet_count}</span></p>
              <h6 className="card-subtitle mb-2 text-muted">Tweet Dated: {element.created_at}</h6>
              <p className="card-text">Tweet: {element.text}</p>
              
          
          </div></div>
            </div>
           } )}</div>
          )

            
    
 }

}