import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../Logout';

library.add(fas);

const MainSideNav = (props) => (
    <SideNav className="background-gradient"
        onSelect={(selected) => {
            const to = '/' + selected;
            if (props.location.pathname !== to) {
                props.history.push(to);
                if (to === '/logout') {
                    Logout(props);
                }
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
            <NavItem eventKey="profile">
                <NavIcon>
                    <FontAwesomeIcon icon={fas.faUserEdit} />
                </NavIcon>
                <NavText>
                    Edit
                </NavText>
            </NavItem>
            <NavItem eventKey="logout">
                <NavIcon>
                    <FontAwesomeIcon icon={fas.faSignOutAlt} />
                </NavIcon>
                <NavText>
                    Logout
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
);

export default MainSideNav;
