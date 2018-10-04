import React from 'react';
import './styles.css';

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

const WeatherIcon = props => {
    return (
        <span className={icons[props.icon]}></span>
    );
}

export default WeatherIcon;
