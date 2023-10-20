import { h, Component } from 'preact';
import style from './style';
import axios from 'axios';
import config from '../../config';

export default class OpenWeatherMap extends Component {
    state = {
        weatherData: null,
        location: null, // Remove the default location
        apiKey: config.apiKey.openweathermap,
        isLoading: false,
        error: null,
    };

    componentDidMount() {
        this.fetchWeatherData();
    }

    fetchWeatherData = () => {
        this.setState({ isLoading: true });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.state.apiKey}&units=metric`;

                axios
                    .get(apiUrl)
                    .then((response) => {
                        this.setState({
                            weatherData: response.data,
                            isLoading: false,
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            error: error,
                            isLoading: false,
                        });
                    });
            },
            (error) => {
                this.setState({
                    error: error.message,
                    isLoading: false,
                });
            }
        );
    };

    render() {
        const { weatherData, isLoading, error } = this.state;

        return (
            <div class={style.container}>
                <h1>Weather for Your Location</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {weatherData && (
                    <div>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    </div>
                )}
            </div>
        );
    }
}
