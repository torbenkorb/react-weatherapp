import React, { Component } from 'react';
import LocalStorage from './services/LocalStorage/LocalStorage.service';
import OpenWeatherMapService from './services/OpenWeatherMap/OpenWeatherMap.service';
import NavigationDrawer from './components/NavigationDrawer';
import ProgressIndicator from './components/ProgressIndicator';
import DateComponent from './components/DateComponent';
import ForecastList from './components/Forecastlist';
import GetLocation from './components/GetLocation';
import CurrentData from "./components/CurrentData";
import { ReactComponent as MenuIcon } from './assets/icons/menu.svg';
import { ReactComponent as UpdateIcon } from './assets/icons/update.svg';
import { initialCitiesMap } from './utils/constants/cities';


class App extends Component {
    constructor(props) {
        super(props);
        if (LocalStorage.hasData()) {
            this.state = LocalStorage.getData();
        } else {
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
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.getWeatherData(this.state.cities[this.state.selectedCity]);
    };

    getWeatherData = city => {
        return OpenWeatherMapService.getWeather(city)
            .then(data => {
                this.setState(prevState => ({
                    weatherAPIData: data,
                    isLoading: false
                }), this.storeData);
            }).catch(err => {
                console.error(err);
            });
    };

    onUpdateWeather = () => {
        this.setState(prevState => ({
            isLoading: true,
            drawerOpen: false
        }));
        this.getWeatherData(this.state.cities[this.state.selectedCity]);
    };

    onToggleDrawer = () => {
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
                    OpenWeatherMapService.getLocationName(position)
                        .then(data => {
                            const cityName = data[0].name;
                            this.setState(prevState => ({
                                selectedCity: cityName,
                                cities: {
                                    ...prevState.cities,
                                    [cityName]: {
                                        coords: {
                                            latitude: position.coords.latitude,
                                            longitude: position.coords.longitude
                                        }
                                    }
                                }
                            }), this.storeData);
                        });
                    this.getWeatherData(position);
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

    storeData = () => {
        LocalStorage.storeData(this.state);
    };


    render = () => {
        const api = this.state.weatherAPIData;
        const selectedCity = this.state.selectedCity;
        const currentTemperature = Math.round(api.current.temp);
        const currentSummary = api.current.weather[0].description;
        const date = (api.current.dt * 1000);

        return (
            <div className="site">

                <ProgressIndicator isLoading={this.state.isLoading} />

                <NavigationDrawer
                    cities={Object.keys(this.state.cities)}
                    selectCity={this.selectCity}
                    isActive={this.state.drawerOpen}
                    toggleDrawer={this.onToggleDrawer}
                />

                <div className="app__topbar">
                    <div className="drawer__activate" onClick={this.onToggleDrawer}><MenuIcon /></div>
                    <GetLocation getCurrentLocation={this.getCurrentLocation} />
                </div>


                <div className="panel">

                    <CurrentData
                        city={selectedCity}
                        temp={currentTemperature}
                        summary={currentSummary}
                        icon={api.current.weather[0].icon} />

                    <ForecastList listItems={api.daily} />

                    <div className="update-app"><button onClick={this.onUpdateWeather} aria-label="Update"><UpdateIcon /></button> Last updated:&nbsp;
                        <DateComponent timestamp={date} />
                    </div>

                </div>

            </div>
        );
    };
}

export default App;
