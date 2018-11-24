import 'bootstrap/dist/css/bootstrap.css'
import HttpService from '../../services/httpServices';
import { Auth } from '../../services/AuthService';

export default function Logout(props) {
    HttpService.post('logout', {})
        .then(() => Auth.logout())
        .catch(err => console.log(err));
}
