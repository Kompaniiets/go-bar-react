import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Input from '../Input';

export default class RegisterForm extends Component {
    state = {};

    onUpdate = (event) => this.setState({ [event.id]: event.value });

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <div className="card rounded-0 form-width">

                <div className="card-header text-center">
                    <h3 className="mb-0">{!this.props.isBar ? 'Register as user' : 'Register as bar'}</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <Input id="email" type="email" label="Email"
                               value={this.state.email}
                               onUpdate={this.onUpdate}/>

                        {!this.props.isBar ? (
                            <React.Fragment>
                                <Input id="firstName" type="text" label="First Name"
                                       value={this.state.firstName}
                                       onUpdate={this.onUpdate}/>
                                <Input id="lastName" type="text" label="Last Name"
                                       value={this.state.lastName}
                                       onUpdate={this.onUpdate}/>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Input id="barName" type="text" label="Bar Name"
                                       value={this.state.barName}
                                       onUpdate={this.onUpdate}/>
                                <Input id="phone" type="phone" label="Phone"
                                       value={this.state.phone}
                                       onUpdate={this.onUpdate}/>
                            </React.Fragment>
                        )}

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
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
