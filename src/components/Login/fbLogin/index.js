import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import HttpService from '../../../services/httpServices';
import { Auth } from '../../../services/AuthService';
import Constants from '../../../constants';
import { ErrorHandler } from '../../../services/ResponseHandler';

class FacebookComponent extends Component {
    responseFacebook = (res) => {
        HttpService.post('fb/login', res)
            .then(user => {
                if (!user.data)
                    return;

                Auth.setStorage(user.data);
                return user;
            })
            .then((user) => {
                if (user.data && user.data.isBar === null) {
                    const result = (window.confirm('Login as bar?')).toString();
                    return HttpService.patch('users/role', { isBar: result })
                        .then(user => Auth.updateStorage(user.data))
                }
            })
            .then(() => this.props.history.push('/'))
            .catch((err) => console.log(err));
    };

    errorFacebook = (err) => ErrorHandler(400, { message: 'Bad Request' });

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
                textButton=""
                cssClass="facebook-btn-class"
                icon="fa-facebook"
            />
        )
    }
}

export default FacebookComponent;
