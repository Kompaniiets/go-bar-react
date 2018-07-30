import React, { Component } from 'react';
import Home from './Home';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import SideNavMenu from './SideNavMenu';
import Auth from '../services/AuthService';

import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';


const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
    )}/>
);

const AuthStatus = withRouter(({ history }) => (
    Auth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            Auth.logout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
));

export default class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header/>
                    <main>
                        <AuthStatus/>
                        <SideNavMenu/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <SecretRoute path="/register" component={Register}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}
