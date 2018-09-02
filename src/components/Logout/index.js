import 'bootstrap/dist/css/bootstrap.css'
import HttpService from '../../services/httpServices';
import AuthService from '../../services/AuthService';

export default function Logout(props) {
    HttpService.post('logout', {})
        .then(() => {
            const Auth = new AuthService();
            Auth.logout();
            props.history.replace('/');
        })
        .catch((err) =>console.log(err));
}
