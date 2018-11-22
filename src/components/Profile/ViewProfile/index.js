import React, { Component } from 'react';
import Input from '../../Input';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css';

export default class ViewProfile extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const data = Object.assign({}, this.props.user);
        this.props.onSubmit(data, 'info');
    };

    onProfileUpdate = (event) => this.props.onProfileUpdate(event);

    render() {
        const user = this.props.user;
        const error = this.props.error;

        return (
            <div className="profile-details">
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <ol>
                        <li>
                            <Input id="email" type="email" label="Email:"
                                   value={user.email}
                                   hasError={error.hasError}
                                   onUpdate={this.onProfileUpdate}
                            />
                        </li>
                        {
                            !user.isBar ?
                                <React.Fragment>
                                    <li>
                                        <Input id="firstName" type="text" label="First Name:"
                                               value={user.firstName}
                                               hasError={error.hasError}
                                               onUpdate={this.onProfileUpdate}
                                        />
                                    </li>
                                    <li>
                                        <Input id="lastName" type="text" label="Last Name:"
                                               value={user.lastName}
                                               hasError={error.hasError}
                                               onUpdate={this.onProfileUpdate}
                                        />
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li>
                                        <Input id="barName" type="text" label="Bar Name:"
                                               value={user.barName}
                                               hasError={error.hasError}
                                               onUpdate={this.onProfileUpdate}
                                        />
                                    </li>
                                    <li>
                                        <Input id="phone" type="tel" label="Phone:"
                                               value={user.phone}
                                               hasError={error.hasError}
                                               onUpdate={this.onProfileUpdate}
                                        />
                                    </li>
                                </React.Fragment>
                        }
                        <li>
                            <Input id="createdAt" type="text" label="Created at:" disabled="disabled"
                                   value={new Date(user.createdAt).toLocaleString()}
                                   hasError={error.hasError}
                                   onUpdate={this.onProfileUpdate}
                            />
                        </li>
                    </ol>
                    <div className="save-profile-btn">
                        <button
                            type="submit"
                            className="btn-style float-right"
                            id="btnLogin">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
