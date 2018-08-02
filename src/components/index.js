import React, { Component } from 'react';
import Home from './Home';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import SideNavMenu from './SideNavMenu';
import Auth from '../services/AuthService';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated ?
            <Component {...props} /> :
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
    )}/>
);

export default class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header/>
                    <SideNavMenu/>
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <SecretRoute path="/register" component={Register}/>
                            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}
