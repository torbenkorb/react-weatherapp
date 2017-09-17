import React, { Component } from 'react';
import Drawer from './components/Drawer';
import Loader from './components/Loader';
import DateComponent from './components/DateComponent';
import ForecastList from './components/Forecastlist';
import GetLocation from './components/GetLocation';
import WeatherIcon from './components/WeatherIcon';
import './App.css';

var citiesObject = {
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
  },
  // "Wiesbaden": {
  //   "coords": {
  //     "latitude": 50.0854584,
  //     "longitude": 8.2389936
  //   }
  // }
}


function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

class App extends Component {

    constructor() {
        super();

        if(!localStorage.getItem('ReactWeatherApp')) {
            this.state = {
                selectedCity: Object.keys(citiesObject)[0],
                cities: citiesObject,
                isLoading: true,
                drawerOpen: false
            }
        } else {
            this.state = JSON.parse(localStorage.getItem('ReactWeatherApp'));
        }



        this.selectCity = this.selectCity.bind(this);
        this.updateWeather = this.updateWeather.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.saveLocalStorage = this.saveLocalStorage.bind(this);

        this.getWeatherData(this.state.cities[this.state.selectedCity]);
    }


    toggleDrawer(event) {
        this.setState(prevState => ({
            drawerOpen: !prevState.drawerOpen
        }));
    }

    selectCity(event) {
        var city = event.target.innerText;

        if(this.state.selectedCity !== city) {

            this.setState(prevState => ({
                selectedCity: city,
                isLoading: true,
                drawerOpen: false
            }));
            this.getWeatherData(this.state.cities[city]);
        }
    }

    getCurrentLocation() {
        console.log('Geolocation API request here...');

        this.setState(prevState => ({
            isLoading: true,
            drawerOpen: false
        }));

        if(navigator.geolocation) {
            this.getDeviceGeoLocation()
                .then(position => {
                    console.dir(position);
                    this.getWeatherData(position);

                    var coordsString = position.coords.latitude + ',' + position.coords.longitude;

                    this.getCityByCoords(coordsString);
                });
        }
    }


    getDeviceGeoLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position);
            }, err => {
                console.log('There was an error using your device\'s Geolocation: ', err.message);
                this.setState({
                    isLoading: false
                });
            });
        });
    }


    getCityByCoords(coords) {
        var gMapsLatLngStr = coords.split(',', 2);
        var gMapsLatLng = {lat: parseFloat(gMapsLatLngStr[0]), lng: parseFloat(gMapsLatLngStr[1])};
        var geocoder = new window.google.maps.Geocoder();
        this.geocodeLatLng(geocoder, gMapsLatLng);
    }

    geocodeLatLng(geocoder, latlng) {
        var _this = this;
        geocoder.geocode({
            'location': latlng,
            'region': 'es'
        }, function(results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                if (results) {
                    var result = results[0].address_components;
                    var cityName = '';
                    for(var i=0; i < result.length; ++i) {
                        if(result[i].types[0] == "locality") {
                            cityName = result[i].long_name;
                        }
                    }
                    console.log(cityName);
                    _this.setState(prevState => ({
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
                    console.log(cityName + ' was saved to your list of cities.');
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    getWeatherData(city) {
        var latitude = city.coords.latitude;
        var longitude = city.coords.longitude;
        var latlng = latitude + "," + longitude;
        var apiURL = latlng + '?units=si&exclude=flags,hourly,minutely,alerts&' + Date.now();

        if(process.env.NODE_ENV === 'production') {
            apiURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9c5f115423c6a7bdf61901d449355c00/' + latlng + '?units=si&exclude=flags,hourly,minutely,alerts&' + Date.now();
        }

        var options = {
            'Accept-Encoding': 'gzip',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-store'
        }

        fetch(apiURL, {
            header: new Headers(options),
            cache: 'no-store'
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState(prevState => ({
                weatherAPIData: data,
                isLoading: false
            }));
            this.saveLocalStorage();
        }).catch(err => {
            console.log(err);
        });
    }


    updateWeather() {
        this.setState(prevState => ({
            isLoading: true,
            drawerOpen: false
        }));
        this.getWeatherData(this.state.cities[this.state.selectedCity]);
    }


    saveLocalStorage() {
        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
            console.log('Local Storage available');
            localStorage.setItem('ReactWeatherApp', JSON.stringify(this.state));
        }
        else {
            // Too bad, no localStorage for us
            console.log('No Local Storage available. Sorry!');
        }
    }


  render() {

    var api = this.state.weatherAPIData;

    if(api) {

        var selectedCity = this.state.selectedCity;
        var currentTemperature = Math.round(api.currently.apparentTemperature);
        var currentSummary = api.currently.summary;
        var date = (api.currently.time * 1000);

        return (
            <div className="App">
                <Loader isLoading={this.state.isLoading} />
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
                            <WeatherIcon icon={api.currently.icon} />
                        </div>
                        <div className="appheader__right">
                            <div className="currTemp">{currentTemperature}°</div>
                            <div className="currSum">{currentSummary}</div>
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <ForecastList listItems={api.daily.data} />
                </div>


                <div className="update-app hint"><i className="material-icons no-select" onClick={this.updateWeather}>update</i> Last updated:&nbsp;
                    <DateComponent timestamp={date} />
                </div>
            </div>
        );
    } else {
        return (
            <Loader isLoading={this.state.isLoading} />
        );
    }


  }
}

export default App;
