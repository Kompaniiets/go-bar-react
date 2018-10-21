import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Input from '../Input';
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';
import FB from './fbLogin';

export default class Login extends Component {
    constructor() {
        super();
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
                if (res.data) {
                    Auth.setStorage(res.data);
                    this.props.history.push('/');
                }
            })
            .catch((err) => this.handleError(err));
    };

    handleError = (err) => {
        this.setState({
            hasError: true,
            errorMessage: err
        });
    };

    render() {
        const err = this.state.hasError ?
            <p>{this.state.errorMessage}</p> : '';

        return (
            <div className="container login-form">
                <div className="card rounded-0 form-width">

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

                            <FB
                                {...this.props}
                                handleError={this.handleError}
                            />
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
        )
    }
}
