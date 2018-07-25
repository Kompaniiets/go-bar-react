import React from 'react';
import { render } from 'react-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

library.add(fas);

render(
    <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route render={({ location, history }) => (
                <React.Fragment>
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
                            {/*<NavItem eventKey="login">*/}
                            {/*<NavIcon>*/}
                            {/*<FontAwesomeIcon icon={fas.faCogs} />*/}
                            {/*</NavIcon>*/}
                            {/*<NavText>*/}
                            {/*Login*/}
                            {/*</NavText>*/}
                            {/*</NavItem>*/}
                            <NavItem eventKey="register">
                                <NavIcon>
                                    <FontAwesomeIcon icon={fas.faAtom} />
                                </NavIcon>
                                <NavText>
                                    Register
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        <Route path="/" exact component={props => <Home/>}/>
                        {/*<Route path="/login" component={props => <Login/>}/>*/}
                        <Route path="/register" component={props => <Register/>}/>
                    </main>
                </React.Fragment>
            )}
            />
        </Switch>
    </Router>,
    document.getElementById('root')
);


// render(
//     <Router>
//         <Switch>
//             <Route exact path="/" component={Home}/>
//             <Route path="/login" component={Login}/>
//             <Route path="/register" component={Register}/>
//         </Switch>
//     </Router>,
//     document.getElementById('root')
// );
