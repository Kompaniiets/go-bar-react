import React from 'react';
import { Route } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

/**
 * Render only Side Nav Menu
 * @constructor
 */
const SideNavMenu = () => (
    <Route render={({ location, history }) => (
        <SideNav
            onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                    history.push(to);
                }
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="">
                    <NavIcon>
                        <FontAwesomeIcon icon={fas.faHome} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="login">
                    <NavIcon>
                        <FontAwesomeIcon icon={fas.faCogs} />
                    </NavIcon>
                    <NavText>
                        Login
                    </NavText>
                </NavItem>
                <NavItem eventKey="register">
                    <NavIcon>
                        <FontAwesomeIcon icon={fas.faDice} />
                    </NavIcon>
                    <NavText>
                        Register
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )}/>
);

export default SideNavMenu;
