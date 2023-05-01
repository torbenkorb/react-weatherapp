import React, { Component } from 'react';
import { Citylist } from '../index';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

class NavigationDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inlineStyle: {}
        };

        this.drawer = {
            startX: 0,
            currX: 0,
            isTouched: false
        };

        this.onTouchHandler = this.onTouchHandler.bind(this);
        this.onTouchMoveHandler = this.onTouchMoveHandler.bind(this);
        this.onTouchEndHandler = this.onTouchEndHandler.bind(this);
        this.swipeDrawer = this.swipeDrawer.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isActive) {
            document.body.classList.add('drawer--open');
        } else {
            document.body.classList.remove('drawer--open');
        }
    }

    onTouchHandler(event) {
        this.drawer.startX = event.touches[0].pageX;
        this.drawer.currX = this.drawer.startX;
        this.drawer.isTouched = true;
        requestAnimationFrame(this.swipeDrawer);
    }

    onTouchMoveHandler(event) {
        if (!this.drawer.isTouched) {
            return;
        }
        this.drawer.currX = event.touches[0].pageX;
    }

    onTouchEndHandler(event) {
        if (!this.drawer.isTouched) {
            return;
        }
        this.drawer.isTouched = false;

        var newState = {
            inlineStyle: {
                transform: ''
            }
        };

        if (Math.min(0, this.drawer.currX - this.drawer.startX) < -40) {
            this.props.toggleDrawer();
        }

        this.setState(prevState => newState);
    }

    swipeDrawer() {
        if (!this.drawer.isTouched) {
            return;
        }
        requestAnimationFrame(this.swipeDrawer);

        var translateX = Math.min(0, this.drawer.currX - this.drawer.startX);
        var transformStyles = 'translateX(' + translateX + 'px)';

        this.setState(prevState => ({
            inlineStyle: {
                transform: transformStyles
            }
        }));
    }

    render() {

        return (
            <aside className={'drawer' + (this.props.isActive ? ' active' : '')}
                onTouchStart={this.onTouchHandler}
                onTouchMove={this.onTouchMoveHandler}
                onTouchEnd={this.onTouchEndHandler}
                style={this.state.inlineStyle}>

                <div className="drawer__header">
                    <h2>Select a city</h2>
                    <button className='drawer__close' onClick={this.props.toggleDrawer} aria-label="Close"><CloseIcon /></button>
                </div>

                <Citylist cities={this.props.cities} selectCity={this.props.selectCity} getLocation={this.props.getLocation} />

                <div className="site-info">
                    Project by <a href="https://www.awmedia.de/">awmedia</a> and <a href="https://www.digital-creative.de/">digitalcreative</a>
                </div>
            </aside>
        );
    }
}

export default NavigationDrawer;
