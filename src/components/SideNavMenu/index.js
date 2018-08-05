import React from 'react';
import { Route } from 'react-router-dom';
import StartNavMenu from './StartSideNav';

const SideNavMenu = () => (
    <Route render={({ location, history }) => (
        <StartNavMenu location={location} history={history} />

    )}/>
);

export default SideNavMenu;
