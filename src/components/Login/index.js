import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';
import UserModel from '../../models/user';
import FB from './fbLogin';
import Input from '../Input';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import {
    required,
    email,
    password
} from '../../validators';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: { ...UserModel({}) },
            hasError: false
        };
    }

    onUpdate = (event) => this.setState({ user: { [event.id]: event.value } });

    handleSubmit = (event) => {
        event.preventDefault();

        HttpService.post('login', {
            email: event.target.email.value,
            password: event.target.password.value,
        }).then(res => {
            Auth.setStorage(res.data);
            this.props.history.push('/');
        }).catch((err) => this.handleError(err));
    };

    handleError = (status) => {
        console.log(this.state.user);
        this.setState({ hasError: status })
    };

    render() {
        return (
            <div className="container login-form full-height">
                <div className="card form-width">

                    <div className="card-header text-center">
                        <h3 className="mb-0">Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <Input id="email" type="email" label="Email"
                                   value={this.state.user.email}
                                   handleError={this.handleError}
                                   onUpdate={this.onUpdate}
                                   validation={[required, email]}
                            />
                            <Input id="password" type="password" label="Password"
                                   value={this.state.user.password}
                                   handleError={this.handleError}
                                   onUpdate={this.onUpdate}
                                   validation={[required, password]}
                            />

                            <button
                                type="submit"
                                className="login-btn"
                                disabled={this.state.hasError}
                                id="btnLogin">
                                Login
                            </button>

                            <FB
                                {...this.props}
                            />
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
