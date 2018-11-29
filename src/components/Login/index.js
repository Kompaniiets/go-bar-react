import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';
import FB from './fbLogin';
import Input from '../Input';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import {
    email,
    password
} from '../../validators';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: {
                value: '',
                valid: false,
                blurred: false,
                errorMessage: '',
                validateSchema: [email]
            },
            password: {
                value: '',
                valid: false,
                blurred: false,
                errorMessage: '',
                validateSchema: [password]
            },
            hasError: false
        };
    }

    onUpdate = (event) => {
        this.updateState(event.id, { value: event.value });
        this.validateInput(event, this.state[event.id].validateSchema);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        HttpService.post('login', {
            email: event.target.email.value,
            password: event.target.password.value,
        }).then(res => {
            Auth.setStorage(res.data);
            this.props.history.push('/');
        }).catch((err) => console.log(err));
    };

    handleOnBlur = (element, status) => {
        this.updateState(element, { blurred: status });
    };

    validateInput = (element, schema) => {
        const { id, value } = element;

        schema.forEach(item => {
            const invalid = item(value);

            if (!invalid) {
                this.updateState(id, { valid: true, errorMessage: '' });
            } else {
                this.updateState(id, { valid: false, errorMessage: invalid });
            }
        });
    };

    updateState = (element, value) => {
        this.setState(prevState => ({
            [element]: Object.assign(prevState[element], value)
        }));
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
                                   value={this.state.email.value}
                                   onUpdate={this.onUpdate}
                                   validation={[email]}
                                   handleOnBlur={this.handleOnBlur}
                            />
                            <div className="form-error">
                                {this.state.email.blurred && !this.state.email.valid ? <p>{this.state.email.errorMessage}</p> : ''}
                            </div>
                            <Input id="password" type="password" label="Password"
                                   value={this.state.password.value}
                                   onUpdate={this.onUpdate}
                                   validation={[password]}
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
