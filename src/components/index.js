import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import SideNavMenu from './SideNavMenu';

import Auth from '../services/AuthService';
import PrivateRoute from '../services/PrivateRoute';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

export default class App extends Component {
    constructor() {
        super();
        this.AuthService = new Auth();
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
        if(this.AuthService.loggedIn()) {
            this.setState({
                isAuthenticated: true
            });
        } else {
            this.AuthService.logout();
            this.setState({
                isAuthenticated: false
            });
        }
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <SideNavMenu isAuth={this.state.isAuthenticated} />
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" render={(props) => (
                                <Login onLogin={this.onLogin} {...props} />
                            )}/>
                            <Route path="/register" component={Register}/>
                            <PrivateRoute path="/profile" component={Profile}/>
                            {/*<PrivateRoute path="/logout" component={Register}/>*/}
                            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}
