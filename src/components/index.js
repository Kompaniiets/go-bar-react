import React, { Component } from 'react';
import PrivateRoute from '../services/PrivateRoute';
import SideNavMenu from './SideNavMenu';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import { routes, privateRoutes } from '../routes';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
    render() {
        const Components = routes.map(({ path, component }, key) => <Route exact path={path} component={component}
                                                                           key={key}/>);
        const PrivateComponents = privateRoutes.map(({ path, component }, key) => <PrivateRoute exact path={path}
                                                                                                component={component}
                                                                                                key={key}/>);

        return (
            <Router>
                <React.Fragment>
                    <SideNavMenu/>
                    <main>
                        <Switch>
                            {Components}
                            {PrivateComponents}
                            <Route render={() => (<div> Sorry, this page does not exist. </div>)}/>
                        </Switch>
                    </main>
                    <Alert stack={{ limit: 3 }}/>
                </React.Fragment>
            </Router>
        )
    }
}
