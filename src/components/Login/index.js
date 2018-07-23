import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Input from '../Input';
import HttpServices from '../../services/httpServices';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        HttpServices.httpGet('login')
            .then(response => response.json())
            .then(res => console.log(res))
            .catch((err) => console.log(err));

        // fetch('http://localhost:4500/api/v1/login', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     mode: 'cors',
        //     body: JSON.stringify({
        //         email: event.target.email.value,
        //         password: event.target.password.value,
        //     })
        // })
        //     .then(response => response.json())
        //     .then(res => console.log(res))
        //     .catch((err) => console.log(err));
    };

    render() {
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
