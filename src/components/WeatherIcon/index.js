import React from 'react';
import './styles.css';

const icons = {
  "01d": "icon-1",
  "01n": "icon-2",
  "02d": "icon-5",
  "02n": "icon-6",
  "03d": "icon-12",
  "03n": "icon-12",
  "04d": "icon-12",
  "04n": "icon-12",
  "09d": "icon-8",
  "09n": "icon-8",
  "10d": "icon-8",
  "10n": "icon-8",
  "11d": "icon-3",
  "11n": "icon-3",
  "13d": "icon-10",
  "13n": "icon-10",
  "50d": "icon-7",
  "50n": "icon-7"
};

const WeatherIcon = props => {
  return (
    <span className={icons[props.icon]}></span>
  );
};

export default WeatherIcon;
