import { h, Component } from 'preact';
import axios from 'axios';
import config from '../../config';

export default class NasaApod extends Component {
    state = {
        nasaData: null,
        isLoading: false,
        error: null,
    };

    componentDidMount() {
        this.fetchNasaData();
    }

    fetchNasaData = () => {
        this.setState({ isLoading: true });

        const apiKey = config.apiKey.nasa;
        const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey;

        axios
            .get(apiUrl)
            .then((response) => {
                this.setState({
                    nasaData: response.data,
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    isLoading: false,
                });
            });
    };

    render() {
        const { nasaData, isLoading, error } = this.state;

        return (
            <div>
                <h1>NASA APOD (Astronomy Picture of the Day)</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {nasaData && (
                    <div>
                        <h2>{nasaData.title}</h2>
                        <img src={nasaData.url} alt={nasaData.title} />
                        <p>{nasaData.explanation}</p>
                    </div>
                )}
            </div>
        );
    }
}
