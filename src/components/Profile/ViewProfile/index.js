import React, { Component } from 'react';
import HttpService from '../../../services/httpServices';
import Input from '../../Input';
import UserModel from '../../../models/user';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css';

export default class ViewProfile extends Component {
    state = {
        ...UserModel({}),
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
        this.props.onSubmit(data, 'info');
    };

    onUpdate = (event) => this.setState({ [event.id]: event.value });

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
                        {
                            !this.props.isBar ?
                                <React.Fragment>
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
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li>
                                        <Input id="barName" type="text" label="Bar Name:"
                                               value={this.state.barName}
                                               hasError={this.state.hasError}
                                               onUpdate={this.onUpdate}
                                        />
                                    </li>
                                    <li>
                                        <Input id="phone" type="tel" label="Phone:"
                                               value={this.state.phone}
                                               hasError={this.state.hasError}
                                               onUpdate={this.onUpdate}
                                        />
                                    </li>
                                </React.Fragment>
                        }
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
                        className="btn-style float-right"
                        id="btnLogin">
                        Save
                    </button>
                </form>
            </div>
        )
    }
}
