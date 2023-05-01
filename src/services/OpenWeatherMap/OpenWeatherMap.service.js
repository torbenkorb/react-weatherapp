const API_BASE_URL = 'https://j3kw67la1a.execute-api.eu-central-1.amazonaws.com';
const endpoints = {
    onecall: 'onecall',
    georeverse: 'georeverse'
};
const params = '&units=metric&exclude=minutely,hourly';

class OpenWeatherMap {

    getWeather(city) {
        const latlng = this.createCoordsParams(city.coords);
        const apiURL = `${API_BASE_URL}/${endpoints.onecall}?${latlng}${params}&${Date.now()}`;

        return fetch(apiURL)
            .then(res => res.ok ? Promise.resolve(res) : res.json().then(Promise.reject.bind(Promise)))
            .then(res => res.json());
    }

    getLocationName(position) {
        const latlng = this.createCoordsParams(position.coords);
        const apiURL = `${API_BASE_URL}/${endpoints.georeverse}?${latlng}`;
        return fetch(apiURL)
            .then(res => res.ok ? Promise.resolve(res) : res.json().then(Promise.reject.bind(Promise)))
            .then(res => res.json());
    }

    createCoordsParams(coords) {
        const { latitude, longitude } = coords;
        return `lat=${latitude}&lon=${longitude}`;
    }
}

export default new OpenWeatherMap();
