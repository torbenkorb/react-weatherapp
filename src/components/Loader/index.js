import React from 'react';

const Loader = props => {
    return (
        <div className={'loader ' + (props.isLoading ? 'active' : '')}>
            <div className="loader__rotation"></div>
        </div>
    );
}

export default Loader;
