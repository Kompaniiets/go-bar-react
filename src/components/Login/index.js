import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';
import FB from './fbLogin';
import Input from '../Input';
import {
    email,
    password
} from '../../validators';
import Validation from '../../services/ValidationService';
import { updateState } from '../../services/StatelessService';
import { WarningHandler } from '../../services/ResponseHandler';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const inputModel = {
    value: '',
    valid: false,
    blurred: false,
    errorMessage: '',
    validateSchema: []
};

const initialState = {
    email: Object.assign({}, inputModel, { validateSchema: [email] }),
    password: Object.assign({}, inputModel, { validateSchema: [password] }),
};

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            ...initialState,
            hasError: false
        };
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

        HttpService.post('login', {
            email: event.target.email.value,
            password: event.target.password.value,
        }).then(res => {
            Auth.setStorage(res.data);
            this.props.history.push('/');
        }).catch((err) => console.log(err));
    };

    handleOnBlur = (element, status) => this.updateState(element, { blurred: status });

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
                                   value={this.state.email.value}
                                   onUpdate={this.onUpdate}
                                   handleOnBlur={this.handleOnBlur}
                            />
                            <div className="form-error">
                                {this.state.email.blurred && !this.state.email.valid ? <p>{this.state.email.errorMessage}</p> : ''}
                            </div>
                            <Input id="password" type="password" label="Password"
                                   value={this.state.password.value}
                                   onUpdate={this.onUpdate}
                                   handleOnBlur={this.handleOnBlur}
                            />
                            <div className="form-error">
                                {this.state.password.blurred && !this.state.password.valid ? <p>{this.state.password.errorMessage}</p> : ''}
                            </div>

                            <button
                                type="submit"
                                className="login-btn"
                                disabled={this.state.hasError}
                                id="btnLogin">
                                Login
                            </button>

                            <FB {...this.props}/>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
