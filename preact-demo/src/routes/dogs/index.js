import { h, Component } from 'preact';
import config from '../../config';

class Dogs extends Component {
    state = {
        dogs: [],
    };

    componentDidMount() {
        // Fetch dog data from The Dog API using the provided API key
        fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
                'x-api-key': config.apiKey.thedogApi,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ dogs: data });
            })
            .catch((error) => {
                console.error('Error fetching dog data:', error);
            });
    }

    render(_, { dogs }) {
        return (
            <div>
                <h2>Dog Cards</h2>
                <ul>
                    {dogs.map((dog, index) => (
                        <li key={index}>
                            <div>
                                <p>Name: {dog.name}</p>
                                <p>Breed Group: {dog.breed_group}</p>
                                <p>Life Span: {dog.life_span}</p>
                                <p>Temperament: {dog.temperament}</p>
                                <p>Origin: {dog.origin}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Dogs;
