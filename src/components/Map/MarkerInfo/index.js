import React, { Component } from 'react';
import './style.css';

export default class ViewProfile extends Component {
    render() {
        return (
            <div>
                <p className="title">{this.props.place.title}</p>
                <span>{this.props.place.opensIn} - {this.props.place.closesIn}</span>
                <br/>
                <span>{this.props.place.name}</span>
            </div>
        )
    }
}
