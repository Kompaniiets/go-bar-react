import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Input from '../Input';
import HttpService from '../../services/httpServices';
import Auth from '../../services/AuthService';

export default class Login extends Component {
    constructor() {
        super();
        this.AuthService = new Auth();
        this.state = {
            email: '',
            password: '',
            hasError: false,
            errorMessage: null,
        };
    }

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        HttpService.post('login', {
            email: event.target.email.value,
            password: event.target.password.value,
        })
            .then(res => {
                if (res && res.data) {
                    this.AuthService.setToken(res.data);
                    this.props.onLogin();
                    this.props.history.push('/');
                }
            })
            .catch((err) => {
                this.setState({
                    hasError: true,
                    errorMessage: err.response.data.errors[0].message
                });
            });
    };

    render() {
        const err = this.state.hasError ?
            <p>{this.state.errorMessage}</p> : '';

        return (
            <div className="container login-form">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card rounded-0">

                            <div className="card-header text-center">
                                <h3 className="mb-0">Login</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    <Input id="email" type="email" label="Email"
                                           value={this.state.email}
                                           hasError={this.state.hasError}
                                           onUpdate={this.onUpdate}
                                    />
                                    <Input id="password" type="password" label="Password"
                                           value={this.state.password}
                                           hasError={this.state.hasError}
                                           onUpdate={this.onUpdate}
                                    />

                                    {err}

                                    <button
                                        type="submit"
                                        className="btn btn-success btn-md float-right"
                                        id="btnLogin">
                                        Login
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
