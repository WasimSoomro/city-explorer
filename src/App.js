import React from 'react';
import axios from 'axios';
import Weather from './Weather/Weather';
import Movie from './Movies/Movie'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: [],
      error: false,
      errorMsg: '',
      mapImageURL: '',
      forecastData: [],
      movies: []
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleGetCityInfo = async (event) => {
    event.preventDefault();

    try {

      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`


      let cityDataFromAxios = await axios.get(url);
      let data = cityDataFromAxios.data;


      if (data.length > 0) {
        this.setState({
          locationData: {
            latitude: data[0].lat,
            longitude: data[0].lon,
            display_name: data[0].display_name
          },
          mapImageURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API}&center=${data[0].lat},${data[0].lon}&zoom=13`,
          error: false,
          errorMsg: ''
        })

        this.handleGetWeatherInfo(data[0].lat, data[0].lon);
        this.handleGetMovieInfo(this.state.city);

      } else {
        this.setState({
          error: true,
          errorMsg: 'No Results',
          mapImageURL: '',
          forecastData: [],
          movies: [],
        })
      }
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching data, ' + error.message,
        mapImageURL: '',
        forecastData: [],
        movies: [],
      });
    }
  }

  handleGetWeatherInfo = async (lat, lon) => {
    try {
      let weatherURL = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.city}`;
      console.log(weatherURL);

      let weatherDataAxios = await axios.get(weatherURL);
      let forecastData = weatherDataAxios.data;

      this.setState({
        forecastData,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching weather data, ' + error.message,
        forecastData: [],

      });
    }
  }

  handleGetMovieInfo = async (searchQuery) => {
    try {
      let movieURL = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${searchQuery}`
      let movieDataFromAxios = await axios.get(movieURL);
      let movies = movieDataFromAxios.data;

      this.setState({
        movies: movies
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching movie data: ' + error.message,
        movies: []
      });
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1>City Explorer</h1>
        <form onSubmit={this.handleGetCityInfo} className="form-container">
          <label htmlFor=""> Enter a City Name:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit" className="submit-button">Explore!</button>
        </form>
        {
          this.state.error
            ? (<p className="error-message">{this.state.errorMsg}</p>)
            : (
              <div className="content">
                <p className="location-info">{this.state.locationData.display_name}</p>
                <p className="location-info">Latitude: {this.state.locationData.latitude}</p>
                <p className="location-info">Longitude: {this.state.locationData.longitude}</p>

                {this.state.forecastData.length > 0 && (
                  <Weather forecastData={this.state.forecastData}/>
                  // <>
                  //   <h2>Weather Forecast</h2>
                  //   {this.state.forecastData.map((day, index) => (
                  //     <div key={index}>
                  //       <p>Date: {day.date}</p>
                  //       <p>Weather: {day.description}</p>
                  //     </div>
                  //   ))}
                  // </>
                )}

                {this.state.mapImageURL && <img src={this.state.mapImageURL} alt="City Map" className="city-map" />}

                {this.state.movies.length > 0 && (
                    <Movie  movies ={this.state.movies}/>
                  // <>
                  //   <h2>Movies</h2>
                  //   {this.state.movies.map((movie, index) => (
                  //     <div key={index}>
                  //       <p>Title: {movie.title}</p>
                  //       <p>Overview: {movie.overview}</p>
                  //       <img src={movie.image} alt={movie.title} />
                  //     </div>
                  //   ))}
                  // </>
                )}

              </div>
            )}

        <footer className="footer">Author: Wasim Soomro</footer>
      </div>
    );
  }
}

export default App;

//Code referenced from Alex Chao during code review
//TA Help