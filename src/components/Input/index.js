import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default class Input extends Component {
    state = { value: '' };

    handleChange = (event) => {
        this.props.onUpdate(event.target);
        this.setState({ value: event.target.value });
    };

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input
                    id={this.props.id}
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}
                    className="form-control form-control-sm"
                />
            </div>
        )
    }
}