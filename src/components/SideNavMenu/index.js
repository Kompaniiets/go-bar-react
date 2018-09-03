import React from 'react';
import { Route } from 'react-router-dom';
import StartNavMenu from './StartSideNav';
import MainSideNav from './MainSideNav';
import { isAuth } from '../../services/AuthService';
import '../../styles/style.css'

const SideNavMenu = (props) => {
    return (
        <Route render={({ location, history }) => (
            !isAuth
              ? <StartNavMenu location={location} history={history} />
                : <MainSideNav location={location} history={history} />
        )}/>
    )
};

export default SideNavMenu;
