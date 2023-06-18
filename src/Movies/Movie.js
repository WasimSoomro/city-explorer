import React from 'react';
import Movies from './Movie';

class Movie extends React.Component {
  render(){
    return(
      <>
      <h2>Movies</h2>
      {this.props.movies.map((movie, index) => (
        <movies movie={movie} key={index}/>
      ))}
    </>
    )
  }
  
  };

export default Movie;
