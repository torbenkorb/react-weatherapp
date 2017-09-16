import React from 'react';

const GetLocation = props => {
    return (
        <div className="getLocation" onClick={props.getCurrentLocation}><i className="material-icons">my_location</i></div>
    );
}

export default GetLocation;
