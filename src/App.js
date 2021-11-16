import React, { Component } from 'react';
import Drawer from './components/Drawer';
import Indicator from './components/Indicator';
import DateComponent from './components/DateComponent';
import ForecastList from './components/Forecastlist';
import GetLocation from './components/GetLocation';
import WeatherIcon from './components/WeatherIcon';
import { storageAvailable } from './lib/utilities';


const initialCitiesMap = {
    "Frankfurt am Main": {
        "coords": {
            "latitude": 50.1109221,
            "longitude": 8.682126700000026
        }
    },
    "Berlin": {
        "coords": {
            "latitude": 52.52000659999999,
            "longitude": 13.404953999999975
        }
    },
    "London": {
        "coords": {
            "latitude": 51.5073509,
            "longitude": -0.12775829999998223
        }
    },
    "New York": {
        "coords": {
            "latitude": 40.7127837,
            "longitude": -74.00594130000002
        }
    },
    "Los Angeles": {
        "coords": {
            "latitude": 34.0522342,
            "longitude": -118.2436849
        }
    }
};


class App extends Component {

    constructor(props) {
        super(props);
        if (!localStorage.getItem('ReactWeatherApp')) {
            this.state = {
                selectedCity: Object.keys(initialCitiesMap)[0],
                cities: initialCitiesMap,
                isLoading: true,
                drawerOpen: false,
                weatherAPIData: {
                    current: {
                        temp: 0,
                        dt: 0,
                        weather: [
                            {
                                description: ''
                            }
                        ]
                    },
                    daily: []
                }
            };
        } else {
            this.state = JSON.parse(localStorage.getItem('ReactWeatherApp'));
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.getWeatherData(this.state.cities[this.state.selectedCity]);
    };

    getWeatherData = city => {
        const { latitude, longitude } = city.coords;
        const latlng = `lat=${latitude}&lon=${longitude}`;
        const APIEndpoint = 'https://j3kw67la1a.execute-api.eu-central-1.amazonaws.com/onecall?';
        const apiURL = APIEndpoint + latlng + '&units=metric&exclude=minutely,hourly&' + Date.now();

        fetch(apiURL)
            .then(res => res.ok ? Promise.resolve(res) : res.json().then(Promise.reject.bind(Promise)))
            .then(res => res.json())
            .then(data => {
                this.setState(prevState => ({
                    weatherAPIData: data,
                    isLoading: false
                }), this.saveLocalStorage);
            }).catch(err => {
                console.error(err);
            });
    };


    updateWeather = () => {
        this.setState(prevState => ({
            isLoading: true,
            drawerOpen: false
        }));
        this.getWeatherData(this.state.cities[this.state.selectedCity]);
    };


    toggleDrawer = () => {
        this.setState(prevState => ({
            drawerOpen: !prevState.drawerOpen
        }));
    };

    selectCity = event => {
        const city = event.target.innerText;
        if (this.state.selectedCity !== city) {
            this.setState(prevState => ({
                selectedCity: city,
                isLoading: true,
                drawerOpen: false
            }));
            this.getWeatherData(this.state.cities[city]);
        }
    };

    getCurrentLocation = () => {

        this.setState(prevState => ({
            isLoading: true,
            drawerOpen: false
        }));

        if (navigator.geolocation) {
            this.getDeviceGeoLocation()
                .then(position => {
                    this.getWeatherData(position);
                    const coordsString = position.coords.latitude + ',' + position.coords.longitude;
                    this.getCityByCoords(coordsString);
                });
        }
    };


    getDeviceGeoLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position);
            }, err => {
                console.error('There was an error using your device\'s Geolocation: ', err.message);
                this.setState({
                    isLoading: false
                });
            });
        });
    };


    getCityByCoords = coords => {
        const gMapsLatLngStr = coords.split(',', 2);
        const gMapsLatLng = { lat: parseFloat(gMapsLatLngStr[0]), lng: parseFloat(gMapsLatLngStr[1]) };
        const geocoder = new window.google.maps.Geocoder();
        this.geocodeLatLng(geocoder, gMapsLatLng);
    };

    geocodeLatLng = (geocoder, latlng) => {
        geocoder.geocode({
            'location': latlng,
            'region': 'es'
        }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
                if (results) {
                    const result = results[0].address_components;
                    let cityName = '';
                    for (let i = 0; i < result.length; ++i) {
                        if ((result[i].types.includes('locality') && result[i].long_name.length > 1)
                            || result[i].types.includes('administrative_area_level_1')) {
                            cityName = result[i].long_name;
                            break;
                        }
                    }
                    this.setState(prevState => ({
                        selectedCity: cityName,
                        cities: {
                            ...prevState.cities,
                            [cityName]: {
                                coords: {
                                    latitude: latlng.lat,
                                    longitude: latlng.lng
                                }
                            }
                        }
                    }));
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };


    saveLocalStorage = () => {
        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
            localStorage.setItem('ReactWeatherApp', JSON.stringify(this.state));
        }
        else {
            // Too bad, no localStorage for us
        }
    };


    render = () => {
        const api = this.state.weatherAPIData;
        const selectedCity = this.state.selectedCity;
        const currentTemperature = Math.round(api.current.temp);
        const currentSummary = api.current.weather[0].description;
        const date = (api.current.dt * 1000);

        return (
            <div className="site">

                <Indicator isLoading={this.state.isLoading} />

                <Drawer
                    cities={Object.keys(this.state.cities)}
                    selectCity={this.selectCity}
                    isActive={this.state.drawerOpen}
                    toggleDrawer={this.toggleDrawer}
                />

                <div className="app__topbar">
                    <div className="drawer__activate" onClick={this.toggleDrawer}><i className="material-icons">menu</i></div>
                    <GetLocation getCurrentLocation={this.getCurrentLocation} />
                </div>


                <div className="App-header">
                    <h1>{selectedCity}</h1>
                    <div className="appheader__content">
                        <div>
                            <WeatherIcon icon={api.current.weather[0].icon} />
                        </div>
                        <div className="appheader__right">
                            <div className="currTemp">{currentTemperature}°</div>
                            <div className="currSum">{currentSummary}</div>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <ForecastList listItems={api.daily} />
                </div>


                <div className="update-app hint"><i className="material-icons no-select" onClick={this.updateWeather}>update</i> Last updated:&nbsp;
                    <DateComponent timestamp={date} />
                </div>

            </div>
        );
    };
}

export default App;
