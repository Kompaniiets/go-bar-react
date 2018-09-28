import React, { Component } from 'react';
import HttpService from '../../../services/httpServices';
import Input from '../../Input';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css';

export default class ViewProfile extends Component {
    state = {
        id: null,
        email: '',
        firstName: '',
        lastName: '',
        barName: '',
        phone: '',
        isBar: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        hasError: false,
        errorMessage: ''
    };

    componentDidMount() {
        HttpService.get('users/me')
            .then(res => {
                this.setState({
                    ...res.data,
                });
            })
            .catch((err) => this.handleError(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = Object.assign({}, this.state);
        data.dataType = 'info';
        this.props.onSubmit(data);
    };

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    handleError = (err) => {
        this.setState({
            hasError: true,
            errorMessage: err
        });
    };

    render() {
        return (
            <div className="profile-details">
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <ol>
                        <li>
                            <Input id="email" type="email" label="Email:"
                                   value={this.state.email}
                                   hasError={this.state.hasError}
                                   onUpdate={this.onUpdate}
                            />
                        </li>
                        <li>
                            <Input id="firstName" type="text" label="First Name:"
                                   value={this.state.firstName}
                                   hasError={this.state.hasError}
                                   onUpdate={this.onUpdate}
                            />
                        </li>
                        <li>
                            <Input id="lastName" type="text" label="Last Name:"
                                   value={this.state.lastName}
                                   hasError={this.state.hasError}
                                   onUpdate={this.onUpdate}
                            />
                        </li>
                        <li>
                            <Input id="createdAt" type="text" label="Created at:" disabled="disabled"
                                   value={new Date(this.state.createdAt).toLocaleString()}
                                   hasError={this.state.hasError}
                                   onUpdate={this.onUpdate}
                            />
                        </li>
                    </ol>
                    <button
                        type="submit"
                        className="btn btn-success btn-md float-right"
                        id="btnLogin">
                        Save
                    </button>
                </form>
            </div>
        )
    }
}
