import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import MapContainer from '../Map';
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';
import './style.css';

export default class Profile extends Component {
    onSubmit = (data) => {
        if (data.dataType === 'info') {
            console.log('info');
            HttpService.patch('users/me', data)
                .then(res => Auth.updateProfile(res.data))
                .catch((err) => console.log('err ', err));
        } else {
            console.log('locations');
            HttpService.post('users/locations', data)
                .then(res => console.log('res ', res))
                .catch((err) => console.log('err ', err));
        }
    };

    render() {
        const check = JSON.parse(Auth.getProfile());
        return (
            <div className="profile-container">
                <ViewProfile onSubmit={this.onSubmit}/>

                {check.isBar ?
                    <div className="profile-location">
                        <MapContainer onSubmit={this.onSubmit}/>
                    </div> : ''
                }

            </div>
        )
    }
}
