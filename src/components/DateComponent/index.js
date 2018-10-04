import React from 'react';
import { sameDay } from '../../lib/utilities';
import './styles.css';

const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
const dateTimeOptions = { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

const DateComponent = props => {
    const dateObject = new Date(props.timestamp);
    const now = new Date(Date.now());
    let dateOutput = sameDay(dateObject, now) ? 'Today' : dateObject.toLocaleDateString('en-GB', dateOptions);

    if(!props.removeTime) {
        dateOutput = dateObject.toLocaleString('en-GB', dateTimeOptions);
    }

    return (
        <div className="date">{dateOutput}</div>
    );
}

export default DateComponent;
