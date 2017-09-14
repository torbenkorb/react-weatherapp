import React, { Component } from 'react';
import Citylist from './Citylist';

class Drawer extends Component {


    componentDidUpdate() {
        //document.body.classList.toggle('darkClass', nextProps.isDark)

        if(this.props.isActive) {
            document.body.classList.add('drawer--open');
        } else {
            document.body.classList.remove('drawer--open');
        }
    }

    render() {

        return (
            <div className={'Drawer' + (this.props.isActive ? ' active' : '')}
                onTouchStart={this.props.onTouchHandler}
                onTouchMove={this.props.onTouchMoveHandler}
                onTouchEnd={this.props.onTouchEndHandler}
                style={this.props.inlineStyle}
            >
                <div className="drawer__header"><h2>Select a city</h2> <i onClick={this.props.toggleDrawer} className="material-icons drawer__close">close</i></div>
                <Citylist cities={this.props.cities} selectCity={this.props.selectCity} getLocation={this.props.getLocation} />
            </div>
        );
    }
}

export default Drawer;
