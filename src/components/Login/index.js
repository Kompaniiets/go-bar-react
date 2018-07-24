import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Input from '../Input';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error: false,
        errorMessage: null,
    };

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:4500/api/v1/login', {
            email: event.target.email.value,
            password: event.target.password.value,
        })
            .then(res => {
                const persons = res.data;
                console.log(persons);
            })
            .catch((err) => {
                this.setState({
                    error: true,
                    errorMessage: err.response.data.errors[0].message
                });
            });
    };

    render() {
        const err = this.state.error ?
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
                                           onUpdate={this.onUpdate}/>
                                    <Input id="password" type="password" label="Password"
                                           value={this.state.password}
                                           onUpdate={this.onUpdate}/>

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
