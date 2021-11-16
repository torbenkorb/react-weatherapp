import React, { Component } from 'react';
import DateComponent from '../DateComponent';
import WeatherIcon from '../WeatherIcon';
import './styles.css';

class ForecastList extends Component {

    render() {
        const listItems = this.props.listItems.map((item, index) => {
            const dateObject = new Date(item.time * 1000);
            return (
                <li key={index}>
                    <div className="forecast__meta">
                        <DateComponent timestamp={dateObject} removeTime={true} />
                        <div className="forecast__summary">{item.summary.replace('.', '')}</div>
                    </div>
                    <div className="forecast__currTemp">
                        <div>
                            <div>{Math.round(item.temperatureMax)}°</div>
                            <div className="hint">{Math.round(item.temperatureMin)}°</div>
                        </div>
                        <WeatherIcon icon={item.icon} />
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
