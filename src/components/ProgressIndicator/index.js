import React from 'react';
import './index.css';

const ProgressIndicator = props => {
    return (
        <div className={'loader ' + (props.isLoading ? 'active' : '')}>
            <div className="loader__rotation"></div>
        </div>
    );
};

export default ProgressIndicator;
