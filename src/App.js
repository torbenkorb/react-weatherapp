import React, { Component } from 'react';
import Drawer from './components/Drawer';
import Loader from './components/Loader';
import ForecastList from './components/Forecastlist';
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
  "Wiesbaden": {
    "coords": {
      "latitude": 50.0854584,
      "longitude": 8.2389936
    }
  }
}

var icons = {
  "clear-day" : "icon-2",
  "clear-night" : "icon-3",
  "rain" : "icon-18",
  "snow" : "icon-7",
  "sleet" : "icon-24",
  "wind" : "icon-19",
  "fog" : "icon-14",
  "cloudy" : "icon-25",
  "partly-cloudy-day" : "icon-8",
  "partly-cloudy-night" : "icon-9"
};




class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedCity: Object.keys(citiesObject)[0],
            cities: citiesObject,
            isLoading: true,
            drawerOpen: false,
            drawerStyle: {}
        }
        this.getWeatherData(this.state.cities[this.state.selectedCity]);
        this.isLoading = true;
        this.onTouchHandler = this.onTouchHandler.bind(this);
        this.onTouchMoveHandler = this.onTouchMoveHandler.bind(this);
        this.onTouchEndHandler = this.onTouchEndHandler.bind(this);
        this.swipeDrawer = this.swipeDrawer.bind(this);

        this.drawer = {
            startX: 0,
            currX: 0,
            isTouched: false,
            css: {}
        };
    }


    toggleDrawer(event) {
        this.setState(prevState => ({
            drawerOpen: !prevState.drawerOpen
        }));
    }


    onTouchHandler(event) {
        this.drawer.startX = event.touches[0].pageX;
        this.drawer.currX = this.drawer.startX;
        this.drawer.isTouched = true;
        requestAnimationFrame(this.swipeDrawer);
    }

    onTouchMoveHandler(event) {
        if(!this.drawer.isTouched) {
            return;
        }
        this.drawer.currX = event.touches[0].pageX;
    }

    onTouchEndHandler(event) {
        if(!this.drawer.isTouched) {
            return;
        }
        this.drawer.isTouched = false;

        var newState = {
            drawerStyle: {
                transform: ''
            }
        }

        if(Math.min(0, this.drawer.currX - this.drawer.startX) < -40 ) {
            newState.drawerOpen = false;
        }


        this.setState(prevState => newState);
    }

    swipeDrawer() {
        if(!this.drawer.isTouched) {
            return;
        }
        requestAnimationFrame(this.swipeDrawer);

        var translateX = Math.min(0, this.drawer.currX - this.drawer.startX);
        var transformStyles = 'translateX(' + translateX + 'px)';

        this.setState(prevState => ({
            drawerStyle: {
                transform: transformStyles
            }
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
                      selectedCity: cityName
                  }));
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
        // var apiURL = 'https://api.darksky.net/forecast/9c5f115423c6a7bdf61901d449355c00/' + latlng + '?units=si&callback=JSON_CALLBACK';
        // var apiURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9c5f115423c6a7bdf61901d449355c00/' + latlng + '?units=si&exclude=flags,hourly,minutely&' + this.counter;
        // var apiURL = '/forecast/9c5f115423c6a7bdf61901d449355c00/' + latlng + '?units=si&exclude=flags,hourly,minutely&' + this.counter;
        // var apiURL = '/forecast/9c5f115423c6a7bdf61901d449355c00/' + latlng + '?units=si&exclude=flags,hourly,minutely';
        var apiURL = latlng + '?units=si&exclude=flags,hourly,minutely,alerts';

        var options = {
          'Accept-Encoding': 'gzip',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-store'
        }

        fetch(apiURL, {
          header: new Headers(options),
          cache: 'no-store'
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.dir(data);
            this.setState(prevState => ({
                weatherAPIData: data,
                isLoading: false
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }


  render() {

    var api = this.state.weatherAPIData;

    if(api) {

        var selectedCity = this.state.selectedCity;
        var currentIcon = icons[api.currently.icon];
        var currentTemperature = Math.round(api.currently.apparentTemperature);
        var currentSummary = api.currently.summary;

        return (
            <div className="App">
                <Loader isLoading={this.state.isLoading} />
                <Drawer
                    cities={Object.keys(this.state.cities)}
                    selectCity={this.selectCity.bind(this)}
                    isActive={this.state.drawerOpen}
                    toggleDrawer={this.toggleDrawer.bind(this)}
                    getLocation={this.getCurrentLocation.bind(this)}
                    onTouchHandler={this.onTouchHandler}
                    onTouchMoveHandler={this.onTouchMoveHandler}
                    onTouchEndHandler={this.onTouchEndHandler}
                    inlineStyle={this.state.drawerStyle}
                />


                <div className="App-header">
                    <h1>{selectedCity}</h1>
                    <div className="appheader__content">
                        <div className="drawer__activate" onClick={this.toggleDrawer.bind(this)}><i className="material-icons">menu</i></div>
                        <div>

                            <div><span className={currentIcon + ' ' + (currentIcon === 'icon-2' ? ' rotate' : '')}></span></div>
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
