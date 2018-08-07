import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HttpService from '../../services/httpServices';

export default class Profile extends Component {
    state = {
        user: {},
        hasError: false,
        errorMessage: null
    };

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
                    errorMessage: err.response.data.errors[0].message
                });
            });
    }

    render() {
        const err = this.state.hasError ?
            <p>{this.state.errorMessage}</p> : '';

        console.log(this.state.user);
        return (
            <div className="container">
                {err}
                <p>{this.state.user.id}</p>
                <p>{this.state.user.email}</p>
            </div>
        )
    }
}
