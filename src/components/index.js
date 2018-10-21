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
    componentDidMount() {
        Auth.loggedIn();
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <SideNavMenu/>
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <PrivateRoute path="/profile" component={Profile}/>

                            <Route render={() => (<div> Sorry, this page does not exist. </div>)}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}
