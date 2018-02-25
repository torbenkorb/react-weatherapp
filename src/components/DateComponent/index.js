import React, { Component } from 'react';
import '../../css/Date.css';


var weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

var months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];


class DateComponent extends Component {

    render() {

        var dateObject = new Date(this.props.timestamp);

        var dayOfWeek = weekdays[dateObject.getDay()];
        var day = dateObject.getDate();
        var month = months[dateObject.getMonth()].substring(0,3);
        var fullDate = dayOfWeek + ', ' + day + '. ' + month;

        var now = new Date(Date.now());
        var nowWeekDay = weekdays[now.getDay()];
        var nowDay = now.getDate();
        var nowMonth = months[now.getMonth()].substring(0,3);
        var nowFullDate = nowWeekDay + ', ' + nowDay + '. ' + nowMonth;

        if(nowFullDate === fullDate) {
            fullDate = 'Today';
        }

        if(!this.props.removeTime) {
            var hours = dateObject.getHours();
            var minutes = dateObject.getMinutes();
            if(minutes < 10 ) {
                minutes = '0' + minutes;
            }
            fullDate += ', ' + hours + ':' + minutes;
        }

        return (
            <div className="date">{fullDate}</div>
        );
    }
}

export default DateComponent;
