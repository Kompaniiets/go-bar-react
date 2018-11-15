import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import BarDetails from './BarDetails';
import SideNavMenu from './SideNavMenu';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

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
                            <Route path="/bars/:id" component={BarDetails}/>
                            <PrivateRoute path="/profile" component={Profile}/>

                            <Route render={() => (<div> Sorry, this page does not exist. </div>)}/>
                        </Switch>
                    </main>
                    <Alert stack={{limit: 3}} />
                </React.Fragment>
            </Router>
        )
    }
}
