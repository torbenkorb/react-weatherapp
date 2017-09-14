import React, { Component } from 'react';
import '../css/List.css';

// var weekdays = [
//     "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"
// ];

var weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

var months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

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

class ForecastList extends Component {

    render() {

        var listItems = this.props.listItems.map((item, index) => {

            var dateObject = new Date(item.time * 1000);

            var dayOfWeek = weekdays[dateObject.getDay()];
            var day = dateObject.getDate();
            var month = months[dateObject.getMonth()].substring(0,3);
            var fullDate = dayOfWeek + ', ' + day + '.' + month;

            return (
                <li key={index}>
                    <div className="forecast__meta">
                        {(index === 0) ? 'Today' : fullDate}
                        <div className="forecast__summary">{item.summary.replace('.','')}</div>
                    </div>
                    <div className="forecast__currTemp">
                        <div>
                            <div>{Math.round(item.temperatureMax)}°</div>
                            <div className="hint">{Math.round(item.temperatureMin)}°</div>
                        </div>
                        <span className={icons[item.icon]}></span>
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
