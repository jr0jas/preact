import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<a href="/" class={style.logo}>
			<img src="../../assets/preact-logo-inverse.svg" alt="Preact Logo" height="32" width="32" />
			<h1>Preact CLI</h1>
		</a>
		<nav>
			<Link activeClassName={style.active} href="/">
				Home
			</Link>
			<Link activeClassName={style.active} href="/profile">
				Me
			</Link>
			<Link activeClassName={style.active} href="/profile/john">
				John
			</Link>
			<Link activeClassName={style.active} href="/openweathermap">
				OpenWeatherMap
			</Link>
			<Link activeClassName={style.active} href="/nasaapod">
				NASA APOD
			</Link>
			<Link activeClassName={style.active} href="/chatwithassistant">
				ChatWithAssistant
			</Link>
			<Link activeClassName={style.active} href="/peoplefinder">
				People Finder
			</Link>
			<Link activeClassName={style.active} href="/dogs">
				Dogs
			</Link>
		</nav>
	</header>
);

export default Header;
