import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import './style.css';

library.add(fas);

export default function Header () {
    return (
        <header>
            <nav className="mainNav">
                <Link to="/"><FontAwesomeIcon icon={fas.faHome} /></Link>
                <Link to="/login">LOGIN</Link>
                <Link to="/register">REGISTRATION</Link>
            </nav>
        </header>
    )
}
