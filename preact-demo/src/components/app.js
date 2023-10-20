import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import OpenWeatherMap from '../routes/openweathermap';
import NasaApod from '../routes/nasaapod';
import ChatWithAssistant from '../routes/chatwithassistant';
import PeopleFinder from '../routes/peoplefinder';
import Dogs from '../routes/dogs';

const App = () => (
	<div id="app">
		<Header />
		<main>
			<Router>
				<Home path="/" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
				<OpenWeatherMap path="/openweathermap" />
				<NasaApod path="/nasaapod" />  
				<ChatWithAssistant path="/chatwithassistant" />
				<PeopleFinder path="peoplefinder" />
				<Dogs path="dogs" />
			</Router>
		</main>
	</div>
);

export default App;
