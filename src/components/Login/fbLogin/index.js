import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookComponent extends Component {

    componentDidMount() {
        this.setFbAsyncInit();
        this.loadSdkAsynchronously();
        let fbRoot = document.getElementById('fb-root');
        if (!fbRoot) {
            fbRoot = document.createElement('div');
            fbRoot.id = 'fb-root';
            document.body.appendChild(fbRoot);
        }
    }

    setFbAsyncInit() {
        window.fbAsyncInit = () => {
            window.FB.init({
                version: 'v3.1',
                appId: "2010455582373439",
                xfbml: true,
            });
        };
    }

    loadSdkAsynchronously() {
        ((d, s, id) => {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    responseFacebook = () => {
        window.FB.login((response) => {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                window.FB.api('/me', (response) => {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email'});
    };

    render() {
        return (
            <div>
                <button onClick={this.responseFacebook}>FB</button>
            </div>
        )
    }
}

export default FacebookComponent;
