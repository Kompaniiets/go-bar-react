import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import HttpService from '../../../services/httpServices';
import Auth from '../../../services/AuthService';
import Constants from '../../../constants';

class FacebookComponent extends Component {
    constructor() {
        super();
        this.AuthService = new Auth();
    }

    responseFacebook = (res) => {
        HttpService.post('fb/login', res)
            .then(res => {
                if (res && res.data && res.data.isBar === null) {
                    
                }
                if (res && res.data) {
                    this.AuthService.setToken(res.data);
                    this.props.onLogin();
                    this.props.history.push('/');
                }
            })
            .catch((err) => this.props.handleError(err));
    };

    errorFacebook = (err) => console.log(err);

    render() {
        return (
            <FacebookLogin
                appId={Constants.facebookAppId}
                autoLoad={false}
                size="small"
                fields="name,email"
                scope="public_profile,email"
                onFailure={this.errorFacebook}
                callback={this.responseFacebook}
            />
        )
    }
}

export default FacebookComponent;
