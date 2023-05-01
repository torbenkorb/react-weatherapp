import React from 'react';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';

const GetLocation = props => {
    return (
        <div className="getLocation" onClick={props.getCurrentLocation}><LocationIcon /></div>
    );
};

export default GetLocation;
