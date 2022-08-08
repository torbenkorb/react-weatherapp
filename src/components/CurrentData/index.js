import React from 'react';
import WeatherIcon from '../WeatherIcon';

const CurrentData = props => {
    return (
        <header className="appheader">
            <h1>{props.city}</h1>
            <div className="appheader__content">
                <div className="appheader__left">
                    <div className="currTemp">{props.temp}°</div>
                    <div className="summary currSum">{props.summary}</div>
                </div>
                <div className='current__icon'>
                    <WeatherIcon icon={props.icon} />
                </div>
            </div>
        </header>
    );
};

export default CurrentData;
