import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import RegisterForm from '../RegisterForm';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'

export default class RegisterSwitcher extends Component {
    onSubmit = (data) => {
        HttpService.post('signup', data)
            .then(res => this.props.history.push('/login'))
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="sign-forms full-height">
                <RegisterForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}
