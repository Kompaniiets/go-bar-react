import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Input from '../Input';

export default class RegisterUser extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        isBar: false,
    };

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const data = Object.assign({}, this.state);
        this.props.onSubmit(data);
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card rounded-0">

                            <div className="card-header text-center">
                                <h3 className="mb-0">Register as user</h3>
                            </div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    <Input id="email" type="email" label="Email"
                                           value={this.state.email}
                                           onUpdate={this.onUpdate}/>
                                    <Input id="firstName" type="text" label="First Name"
                                           value={this.state.firstName}
                                           onUpdate={this.onUpdate}/>
                                    <Input id="lastName" type="text" label="Last Name"
                                           value={this.state.lastName}
                                           onUpdate={this.onUpdate}/>
                                    <Input id="password" type="password" label="Password"
                                           value={this.state.password}
                                           onUpdate={this.onUpdate}/>
                                    <Input id="confirmPassword" type="password" label="Confirm Password"
                                           value={this.state.confirmPassword}
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
