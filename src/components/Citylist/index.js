import React, { Component } from 'react';
import './index.css';

class Citylist extends Component {

    render() {
        const listItems = this.props.cities.map(item => {
            return (<li onClick={this.props.selectCity} key={item.toLowerCase()}>{item}</li>);
        });

        return (
            <div className="Citylist">
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default Citylist;
