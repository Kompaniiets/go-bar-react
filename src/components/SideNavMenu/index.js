import React from 'react';
import { Route } from 'react-router-dom';
import StartNavMenu from './StartSideNav';
import MainSideNav from './MainSideNav';

const SideNavMenu = (props) => (
    <Route render={({ location, history }) => (
        !props.isAuth
            ? <StartNavMenu location={location} history={history} />
            : <MainSideNav location={location} history={history} />
    )}/>
);

export default SideNavMenu;
