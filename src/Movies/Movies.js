import React from 'react';

class Movies extends React.Component {
  render(){
    return(
      
        <div key={this.props.index}>
          <p>Title: {this.props.day.Title}</p>
          <p>Overview: {this.props.day.Overview}</p>
          <img src={this.props.movie.image} alt={this.props.movie.title} />
        </div>

    )
  }
  };

export default Movies;
