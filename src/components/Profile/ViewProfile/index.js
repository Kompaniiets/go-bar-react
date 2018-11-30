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

    handleOnBlur = (element, status) => {};

    render() {
        const user = this.props.user;

        return (
            <div className="profile-details">
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <ol>
                        <li>
                            <Input id="email" type="email" label="Email:"
                                   value={user.email}
                                   onUpdate={this.onProfileUpdate}
                                   handleOnBlur={this.handleOnBlur}
                            />
                        </li>
                        {
                            !user.isBar ?
                                <React.Fragment>
                                    <li>
                                        <Input id="firstName" type="text" label="First Name:"
                                               value={user.firstName}
                                               onUpdate={this.onProfileUpdate}
                                               handleOnBlur={this.handleOnBlur}
                                        />
                                    </li>
                                    <li>
                                        <Input id="lastName" type="text" label="Last Name:"
                                               value={user.lastName}
                                               onUpdate={this.onProfileUpdate}
                                               handleOnBlur={this.handleOnBlur}
                                        />
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li>
                                        <Input id="barName" type="text" label="Bar Name:"
                                               value={user.barName}
                                               onUpdate={this.onProfileUpdate}
                                               handleOnBlur={this.handleOnBlur}
                                        />
                                    </li>
                                    <li>
                                        <Input id="phone" type="tel" label="Phone:"
                                               value={user.phone}
                                               onUpdate={this.onProfileUpdate}
                                               handleOnBlur={this.handleOnBlur}
                                        />
                                    </li>
                                </React.Fragment>
                        }
                        <li>
                            <Input id="createdAt" type="text" label="Created at:" disabled="disabled"
                                   value={new Date(user.createdAt).toLocaleString()}
                                   onUpdate={this.onProfileUpdate}
                                   handleOnBlur={this.handleOnBlur}
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
