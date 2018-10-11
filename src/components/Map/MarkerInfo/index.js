import React, { Component } from 'react';

export default class ViewProfile extends Component {
    render() {
        return (
            <div>
                <h5>{this.props.place.title}</h5>
                <p>{this.props.place.name}</p>
            </div>
        )
    }
}
