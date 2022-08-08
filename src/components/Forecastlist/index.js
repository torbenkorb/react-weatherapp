import React, { Component } from 'react';
import DateComponent from '../DateComponent';
import WeatherIcon from '../WeatherIcon';
import './styles.css';

class ForecastList extends Component {

    render() {
        const listItems = this.props.listItems.map((item, index) => {
            const dateObject = new Date(item.dt * 1000);
            return (
                <li key={index}>
                    <div className="forecast__meta">
                        <DateComponent timestamp={dateObject} removeTime={true} />
                        <div className="summary forecast__summary">{item.weather[0].description}</div>
                    </div>
                    <div className="forecast__currTemp">
                        <div>
                            <div>{Math.round(item.temp.max)}°</div>
                            <div className="hint">{Math.round(item.temp.min)}°</div>
                        </div>
                        <WeatherIcon icon={item.weather[0].icon} />
                    </div>
                </li>
            );
        });

        return (
            <ul className='List'>
                {listItems}
                {this.props.children}
            </ul>
        );
    }
}

export default ForecastList;
