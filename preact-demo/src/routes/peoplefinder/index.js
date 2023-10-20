import { h, Component } from 'preact';

class PeopleFinder extends Component {
    state = {
        country: '',
        people: [],
        countryOptions: [], // Store country options fetched from the API
    };

    componentDidMount() {
        // Fetch the list of countries from the restcountries.com API
        fetch('https://restcountries.com/v3/all')
            .then((response) => response.json())
            .then((data) => {
                // Extract country names and codes from the API response
                const countryOptions = data.map((country) => ({
                    code: country.cca2,
                    name: country.name.common,
                }));
                this.setState({ countryOptions });
            })
            .catch((error) => {
                console.error('Error fetching country data:', error);
            });
    }

    onCountryChange = (e) => {
        this.setState({ country: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { country } = this.state;

        // Check if a country is selected
        if (!country) {
            console.error('Please select a country.');
            return;
        }

        // Fetch people from the RandomUser.me API based on the selected country
        try {
            const response = await fetch(`https://randomuser.me/api/?nat=${country}&results=10`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                this.setState({ people: data.results });
            } else {
                console.error('No people found for the selected country.');
            }
        } catch (error) {
            console.error('Error fetching people data:', error);
        }
    };

    render(_, { country, people, countryOptions }) {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select a Country:
                        <select value={country} onChange={this.onCountryChange}>
                            <option value="">Select</option>
                            {countryOptions.map((option) => (
                                <option key={option.code} value={option.code}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Search</button>
                </form>
                {people.length > 0 && (
                    <div>
                        <h2>People from {country}</h2>
                        <ul>
                            {people.map((person, index) => (
                                <li key={index}>
                                    <img src={person.picture.thumbnail} alt="Profile" />
                                    <div>
                                        <p>Name: {person.name.first} {person.name.last}</p>
                                        <p>Gender: {person.gender}</p>
                                        <p>Email: {person.email}</p>
                                        <p>Phone: {person.phone}</p>
                                        <p>Cell: {person.cell}</p>
                                        <p>Date of Birth: {new Date(person.dob.date).toLocaleDateString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default PeopleFinder;
