import React, { Component } from 'react';

export default class Home extends Component {
    componentDidMount() {
        this.props.onLogin();
    };

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

