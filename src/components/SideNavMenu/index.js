import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default class SideNavMenu extends Component {
    constructor(){
        super()
    }

    render() {
        return (
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
                        <NavItem eventKey="login">
                            <NavIcon>
                                <FontAwesomeIcon icon={fas.faCogs} />
                            </NavIcon>
                            <NavText>
                                Login
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <main>
                    {/*<Route path="/" exact component={props => <Home/>}/>*/}
                    {/*<Route path="/login" component={props => <Login/>}/>*/}
                    {/*<Route path="/register" component={props => <Register/>}/>*/}
                </main>
            </React.Fragment>
        )
    }
}
//
// render(
//     <Router>
//         <Route render={({ location, history }) => (
//             <React.Fragment>
//                 <SideNav
//                     onSelect={(selected) => {
//                         const to = '/' + selected;
//                         if (location.pathname !== to) {
//                             history.push(to);
//                         }
//                     }}
//                 >
//                     <SideNav.Toggle/>
//                     <SideNav.Nav defaultSelected="home">
//                         <NavItem eventKey="">
//                             <NavIcon>
//                                 <FontAwesomeIcon icon={fas.faHome} />
//                             </NavIcon>
//                             <NavText>
//                                 Home
//                             </NavText>
//                         </NavItem>
//                         <NavItem eventKey="login">
//                             <NavIcon>
//                                 <FontAwesomeIcon icon={fas.faCogs} />
//                             </NavIcon>
//                             <NavText>
//                                 Login
//                             </NavText>
//                         </NavItem>
//                     </SideNav.Nav>
//                 </SideNav>
//                 <main>
//                     <Route path="/" exact component={props => <Home/>}/>
//                     <Route path="/login" component={props => <Login/>}/>
//                     <Route path="/register" component={props => <Register/>}/>
//                 </main>
//             </React.Fragment>
//         )}
//         />
//     </Router>,
//     document.getElementById('root')
// );
