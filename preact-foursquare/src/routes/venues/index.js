import { h, Component } from 'preact';
import style from './style';
var foursquare = require('react-foursquare')({
    clientID: '',
    clientSecret: ''
});
export default class Venues extends Component {
    state = {
        items: [],
        query: '',
        near: 'San Francisco, CA'
    };
    componentDidMount() {
        this.fetchVenues();
    }
    fetchVenues = () => {
        var params = {
            "near": this.state.near,
            "intent": 'browse',
            'query': this.state.query
        };
        foursquare.venues.recommendations(params)
            .then(res => {
                console.log(res)
                this.setState({ items: res.response.group.results });
            })
    }
    setQuery = e => {
        this.setState({ query: e.target.value });
    }
    setLocation = e => {
        this.setState({ near: e.target.value });
    }
    render() {
        return (
            <div class={style.container}>
                <header class={style.header}>
                    <div class={style.search}>
                        <label>Find</label>
                        <input class={style.query} type='text' onChange={this.setQuery} placeholder='coffee, nail salon, barbershop' />
                        <span class={style.bar}>|</span>
                        <label>Near</label>
                        <input class={style.near} type='text' onChange={this.setLocation} placeholder='San Francisco' />
                        <button class={style.find} onClick={this.fetchVenues}> Search </button>
                    </div>
                </header>
                {this.state.items.map(item => {
                    if (item.photo) {
                        var photo_url = item.photo.prefix + '400x400' + item.photo.suffix;
                        var ratingColor = 'background-color: #' + item.venue.ratingColor;
                        var category_icon = item.venue.categories[0].icon.prefix + '100' + item.venue.categories[0].icon.suffix;
                        var venue_url = "https://foursquare.com/v/" + item.venue.id;
                        return (
                            <div class={style.row} key={item.venue.id}>
                                <a href={venue_url}>
                                    <div class={style.box}>
                                        <img src={photo_url} />
                                        <div class={style.wrap}>
                                            <p class={style.venue_name}>{item.venue.name}</p>
                                            <p class={style.venue_address}>{item.venue.location.address}, {item.venue.location.city}</p>
                                            <span class={style.rating} style={ratingColor}>{item.venue.rating}</span>
                                            <span class={style.category}><img class={style.category_icon} src={category_icon} /></span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}