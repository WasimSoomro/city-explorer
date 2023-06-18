import React from 'react';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
render(){
  return(
    <>
    <h2>Weather Forecast</h2>
    {this.props.forecastData.map((day, index) => (
      <WeatherDay day={day} key={index}/>
      // <div key={index}>
      //   <p>Date: {day.date}</p>
      //   <p>Weather: {day.description}</p>
      // </div>
    ))}
  </>
  )
}

};

export default Weather;
