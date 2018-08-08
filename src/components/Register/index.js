import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import RegisterBar from '../RegisterBar';
import RegisterUser from '../RegisterUser';
import HttpService from '../../services/httpServices';

export default class RegisterSwitcher extends Component {
    state = {
        isBar: false,
        hasError: false,
        errorMessage: null
    };

    handleChange = () => {
        this.setState({ isBar: !this.state.isBar });
    };

    onSubmit = (data) => {
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
            <div className="container">
                <div className="col-md-4 mx-auto">
                    <p>Check how you want to register</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={this.state.isBar}
                            onChange={this.handleChange}
                        />
                        <span className="slider round"> </span>
                    </label>
                </div>
                <div>
                    {
                        this.state.isBar ?
                            <RegisterBar onSubmit={this.onSubmit} /> :
                            <RegisterUser onSubmit={this.onSubmit} />
                    }
                    {err}
                </div>
            </div>
        )
    }
}
