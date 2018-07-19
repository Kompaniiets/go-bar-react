import React from 'react';
import { render } from 'react-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
