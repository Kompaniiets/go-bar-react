import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import BarDetails from '../components/BarDetails';

const routes = [{
    path: '/',
    component: Home,
}, {
    path: '/login',
    component: Login,
}, {
    path: '/register',
    component: Register,
}, {
    path: '/bars/:id',
    component: BarDetails,
}];

export default routes;
