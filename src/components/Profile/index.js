import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import MapContainer from '../Map';
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';
import './style.css';

export default class Profile extends Component {
    onSubmit = (data, type) => {
        if (type === 'info') {
            HttpService.patch('users/me', data)
                .then(res => Auth.setStorage(res.data))
                .catch((err) => console.log('err ', err));
        } else {
            HttpService.post('users/locations', data)
                .then(res => console.log('res ', res))
                .catch((err) => console.log('err ', err));
        }
    };

    render() {
        const check = Auth.getProfile();
        return (
            <div className="profile-container">
                <ViewProfile onSubmit={this.onSubmit} isBar={check.isBar}/>

                {check.isBar ?
                    <div className="profile-location">
                        <MapContainer onSubmit={this.onSubmit}/>
                    </div> : ''
                }

            </div>
        )
    }
}
