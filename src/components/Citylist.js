import React, { Component } from 'react';

class Citylist extends Component {

    constructor(props) {
        super(props);
        this.cityList = props.cities;

        this.handleClick = props.selectCity.bind(this);

        this.listItems = this.cityList.map(item => {
            return (<li onClick={this.handleClick} key={item.toLowerCase()}>{item}</li>);
        });
    }

    render() {
        return (
            <div className="Citylist">
                <ul>
                    {this.listItems}
                </ul>
            </div>
        );
    }
}

export default Citylist;
