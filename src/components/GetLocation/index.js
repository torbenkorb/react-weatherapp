import React from 'react';
import { ReactComponent as LocationIcon } from '../../icons/location.svg';

const GetLocation = props => {
    return (
        <div className="getLocation" onClick={props.getCurrentLocation}><LocationIcon /></div>
    );
};

export default GetLocation;
