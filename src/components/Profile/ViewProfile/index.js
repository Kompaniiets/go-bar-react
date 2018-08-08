import React, { Component } from 'react';

export default class ViewProfile extends Component {

    render() {
        return (
            <div>
                <ol>
                    <li>
                        <b>Email: </b><span>{this.props.user.email}</span>
                    </li>
                    <li>
                        <b>First name: </b><span>{this.props.user.firstName}</span>
                    </li>
                    <li>
                        <b>Last name: </b><span>{this.props.user.lastName}</span>
                    </li>
                    <li>
                        <b>Created at: </b><span>{new Date(this.props.user.createdAt).toDateString()}</span>
                    </li>
                </ol>
            </div>
        )
    }
}
