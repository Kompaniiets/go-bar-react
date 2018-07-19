import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import RegisterBar from '../RegisterBar';
import RegisterUser from '../RegisterUser';

export default class RegisterSwitcher extends Component {
    state = {
        isBar: false,
    };

    handleChange = () => {
        this.setState({ isBar: !this.state.isBar });
    };

    render() {
        console.log(this.state.isBar);
        return (
            <div className="container">
                <div className="col-md-4 mx-auto">
                    <p>Check how you want to register</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={this.state.isBar}
                            onChange={this.handleChange}
                        />
                        <span className="slider round"> </span>
                    </label>
                </div>
                <div>
                    {
                        this.state.isBar ? <RegisterBar /> : <RegisterUser />
                    }
                </div>
            </div>
        )
    }
}
