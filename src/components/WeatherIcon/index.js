import React from 'react';
import './styles.css';

const icons = {
  "clear-day" : "icon-1",
  "clear-night" : "icon-2",
  "rain" : "icon-8",
  "snow" : "icon-11",
  "sleet" : "icon-10",
  "wind" : "icon-3",
  "fog" : "icon-7",
  "cloudy" : "icon-12",
  "partly-cloudy-day" : "icon-5",
  "partly-cloudy-night" : "icon-6"
};

const WeatherIcon = props => {
    return (
        <span className={icons[props.icon]}></span>
    );
}

export default WeatherIcon;
