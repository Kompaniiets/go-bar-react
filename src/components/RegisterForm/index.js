import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Input from '../Input';
import {
    email,
    password,
    phone,
    required,
    name
} from '../../validators';
import Validation from '../../services/ValidationService';
import { updateState } from '../../services/StatelessService';
import { WarningHandler } from '../../services/ResponseHandler';

const inputModel = {
    value: '',
    valid: false,
    blurred: false,
    errorMessage: '',
    validateSchema: []
};

const initialState = {
    email: Object.assign({}, inputModel, { validateSchema: [email] }),
    firstName: Object.assign({}, inputModel, { validateSchema: [required, name] }),
    lastName: Object.assign({}, inputModel, { validateSchema: [required, name] }),
    barName: Object.assign({}, inputModel, { valid: true, validateSchema: [required, name] }),
    phone: Object.assign({}, inputModel, { valid: true,  validateSchema: [phone] }),
    password: Object.assign({}, inputModel, { validateSchema: [password] }),
    confirmPassword: Object.assign({}, inputModel, { validateSchema: [] }),
    isBar: false,
};

export default class RegisterForm extends Component {
    constructor() {
        super();
        this.state = initialState;
        this.validation = new Validation(this);
        this.updateState = updateState.bind(this);
    }

    onUpdate = (event) => {
        this.updateState(event.id, { value: event.value });
        this.validation.validateInput(event, this.state[event.id].validateSchema);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const submitObj = {};

        for (let key in this.state) {
            if (this.state[key].hasOwnProperty('valid') && this.state[key].valid === false) {
                WarningHandler('Some input has invalid value!');
                return;
            }

            if (this.state[key].hasOwnProperty('value')) {
                submitObj[key] = this.state[key].value;
            }
        }

        submitObj.isBar = this.state.isBar;
        this.props.onSubmit(submitObj);
    };

    handleOnBlur = (element, status) => this.updateState(element, { blurred: status });

    handleChange = () => {
        if (!this.state.isBar) {
            this.updateRegistrationState(true, true, false, false);
        } else {
            this.updateRegistrationState(false, false, true, true);
        }
    };

    updateRegistrationState = (firstName, lastName, barName, phone) => {
        this.setState(prevState => ({
            ...prevState,
            firstName: {
                ...prevState.firstName,
                valid: firstName,
            },
            lastName: {
                ...prevState.lastName,
                valid: lastName,
            },
            barName: {
                ...prevState.barName,
                valid: barName,
            },
            phone: {
                ...prevState.phone,
                valid: phone,
            },
            isBar: !this.state.isBar
        }));
    };

    render() {
        return (
            <div>
                <div className="register-switcher">
                    <span>Check role</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={this.state.isBar}
                            onChange={this.handleChange}
                        />
                        <span className="slider round"> </span>
                    </label>
                </div>

                <div className="card form-width">

                    <div className="card-header text-center">
                        <h3 className="mb-0">{!this.state.isBar ? 'Register as user' : 'Register as bar'}</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <Input id="email" type="email" label="Email"
                                   value={this.state.email.value}
                                   onUpdate={this.onUpdate}
                                   handleOnBlur={this.handleOnBlur}
                            />
                            <div className="form-error">
                                {this.state.email.blurred && !this.state.email.valid ? <p>{this.state.email.errorMessage}</p> : ''}
                            </div>

                            {!this.state.isBar ? (
                                <React.Fragment>
                                    <Input id="firstName" type="text" label="First Name"
                                           value={this.state.firstName.value}
                                           onUpdate={this.onUpdate}
                                           handleOnBlur={this.handleOnBlur}
                                    />
                                    <div className="form-error">
                                        {this.state.firstName.blurred && !this.state.firstName.valid ? <p>{this.state.firstName.errorMessage}</p> : ''}
                                    </div>
                                    <Input id="lastName" type="text" label="Last Name"
                                           value={this.state.lastName.value}
                                           onUpdate={this.onUpdate}
                                           handleOnBlur={this.handleOnBlur}
                                    />
                                    <div className="form-error">
                                        {this.state.lastName.blurred && !this.state.lastName.valid ? <p>{this.state.lastName.errorMessage}</p> : ''}
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Input id="barName" type="text" label="Bar Name"
                                           value={this.state.barName.value}
                                           onUpdate={this.onUpdate}
                                           handleOnBlur={this.handleOnBlur}
                                    />
                                    <div className="form-error">
                                        {this.state.barName.blurred && !this.state.barName.valid ? <p>{this.state.barName.errorMessage}</p> : ''}
                                    </div>
                                    <Input id="phone" type="phone" label="Phone"
                                           value={this.state.phone.value}
                                           onUpdate={this.onUpdate}
                                           handleOnBlur={this.handleOnBlur}
                                    />
                                    <div className="form-error">
                                        {this.state.phone.blurred && !this.state.phone.valid ? <p>{this.state.phone.errorMessage}</p> : ''}
                                    </div>
                                </React.Fragment>
                            )}

                            <Input id="password" type="password" label="Password"
                                   value={this.state.password.value}
                                   onUpdate={this.onUpdate}
                                   handleOnBlur={this.handleOnBlur}
                            />
                            <div className="form-error">
                                {this.state.password.blurred && !this.state.password.valid ? <p>{this.state.password.errorMessage}</p> : ''}
                            </div>
                            <Input id="confirmPassword" type="password" label="Confirm Password"
                                   value={this.state.confirmPassword.value}
                                   onUpdate={this.onUpdate}
                                   handleOnBlur={this.handleOnBlur}
                            />
                            <div className="form-error">
                                {this.state.confirmPassword.blurred && !this.state.confirmPassword.valid ? <p>{this.state.confirmPassword.errorMessage}</p> : ''}
                            </div>

                            <button
                                type="submit"
                                className="login-btn"
                                id="btnLogin">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
