import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import ViewProfile from './ViewProfile';

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            hasError: false,
            errorMessage: null
        };
    }

    componentDidMount() {
        HttpService.get('users/me')
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
            .catch((err) => {
                this.setState({
                    hasError: true,
                    errorMessage: err
                });
            });
    }

    render() {
        const err = this.state.hasError ?
            <p>{this.state.errorMessage}</p> : '';

        return (
            <div>
                {err}
                <ViewProfile user={this.state.user}/>
            </div>
        )
    }
}
