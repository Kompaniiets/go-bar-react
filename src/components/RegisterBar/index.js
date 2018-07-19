import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Input from '../Input';

export default class RegisterBar extends Component {
    state = {
        email: '',
        barName: '',
        phone: '',
        password: '',
    };

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card rounded-0">

                            <div className="card-header text-center">
                                <h3 className="mb-0">Register as bar</h3>
                            </div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form-horizontal">
                                    <Input id="email" type="email" label="Email"
                                           value={this.state.email}
                                           onUpdate={this.onUpdate}/>
                                    <Input id="barName" type="text" label="Bar Name"
                                           value={this.state.barName}
                                           onUpdate={this.onUpdate}/>
                                    <Input id="phone" type="phone" label="Phone"
                                           value={this.state.phone}
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
