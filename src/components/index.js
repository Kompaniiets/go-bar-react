import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import SideNavMenu from './SideNavMenu';

import { Auth } from '../services/AuthService';
import PrivateRoute from '../services/PrivateRoute';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount() {
        this.checkLogin();
    }

    onLogin = () => {
        this.checkLogin();
    };

    checkLogin() {
        if (Auth.loggedIn()) {
            this.setState({
                isAuthenticated: true
            });
        } else {
            Auth.logout();
            this.setState({
                isAuthenticated: false
            });
        }
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <SideNavMenu isAuthenticated={this.state.isAuthenticated}/>
                    <main>
                        <Switch>
                            <Route exact path="/" render={(props) => (
                                <Home onLogin={this.onLogin} {...props} />
                            )}/>
                            <Route path="/login" render={(props) => (
                                <Login onLogin={this.onLogin} {...props} />
                            )}/>
                            <Route path="/register" component={Register}/>
                            <PrivateRoute path="/profile" component={Profile} onLogin={this.onLogin}/>

                            <Route render={() => (<div> Sorry, this page does not exist. </div>)}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}
