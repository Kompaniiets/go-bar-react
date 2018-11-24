import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const StartSideNav = (props) => (
    <SideNav className="background-gradient"
        onSelect={(selected) => {
            const to = '/' + selected;
            if (props.location.pathname !== to) {
                props.history.push(to);
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
                    <FontAwesomeIcon icon={fas.faSignInAlt} />
                </NavIcon>
                <NavText>
                    Login
                </NavText>
            </NavItem>
            <NavItem eventKey="register">
                <NavIcon>
                    <FontAwesomeIcon icon={fas.faUserPlus} />
                </NavIcon>
                <NavText>
                    Register
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
);

export default StartSideNav;
