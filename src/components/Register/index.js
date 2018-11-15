import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import RegisterForm from '../RegisterForm';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'

export default class RegisterSwitcher extends Component {
    state = {
        isBar: false,
        hasError: false,
        errorMessage: null
    };

    handleChange = () => this.setState({ isBar: !this.state.isBar });

    onSubmit = (data) => {
        data.isBar = this.state.isBar;
        HttpService.post('signup', data)
            .then(res => this.props.history.push('/login'))
            .catch((err) => {
                this.setState({
                    hasError: true,
                    errorMessage: err
                });
            });
    };

    render() {
        const err = this.state.hasError ?
            <p>{this.state.errorMessage}</p> : '';

        return (
            <div className="sign-forms">
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
                    <RegisterForm onSubmit={this.onSubmit} isBar={this.state.isBar} />
                    {err}
                </div>
            </div>
        )
    }
}
