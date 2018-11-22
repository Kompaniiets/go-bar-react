import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import UploadLogo from './UploadBarLogo';
import MapContainer from '../Map';
import HttpService from '../../services/httpServices';
import UserModel from '../../models/user';
import { Auth } from '../../services/AuthService';
import './style.css';

export default class Profile extends Component {
    state = {
        user: { ...UserModel({}) },
        error: {
            hasError: false,
            errorMessage: ''
        }
    };

    componentDidMount() {
        HttpService.get('users/me')
            .then(res => {
                this.setState({
                    user: { ...res.data }
                });
            })
            .catch((err) => this.handleError(err));
    }

    onSubmit = (data, type) => {
        // if (type === 'info') {
        //     HttpService.patch('users/me', data)
        //         .then(res => Auth.updateStorage(res.data))
        //         .catch((err) => console.log('err ', err));
        // } else {
        //     HttpService.post('users/locations', data)
        //         .then(res => console.log('res ', res))
        //         .catch((err) => console.log('err ', err));
        // }
    };

    onProfileUpdate = (event) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [event.id]: event.value
            }
        }));
    };

    handleError = (err) => {
        this.setState({
            error: {
                hasError: true,
                errorMessage: err
            }
        });
    };

    render() {
        const check = Auth.getProfile();
        return (
            <div className="profile-container">
                <div>
                    <ViewProfile
                        onSubmit={this.onSubmit}
                        user={this.state.user}
                        error={this.state.error}
                        onProfileUpdate={this.onProfileUpdate}
                    />
                    {check.isBar ?
                        <UploadLogo
                            avatarUrl={this.state.user.avatarUrl}
                            error={this.state.error}
                            onProfileUpdate={this.onProfileUpdate}
                        />
                        : ''}
                </div>
                {check.isBar ?
                    <div className="map-wrapper">
                        <MapContainer onSubmit={this.onSubmit}/>
                    </div> : ''
                }

            </div>
        )
    }
}
