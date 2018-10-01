import React, { Component } from 'react';

export default class ViewProfile extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.place.title}</h4>
                <p>{this.props.place.name}</p>
            </div>
        )
    }
}
