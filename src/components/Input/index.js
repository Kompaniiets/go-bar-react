import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css';

export default class Input extends Component {
    state = { value: '' };

    handleChange = (event) => {
        event.preventDefault();
        const data = {
            id: event.target.id,
            value: event.target.value
        };

        if (this.props.dataKey !== undefined)
            data.key = this.props.dataKey;

        this.setState({ value: event.target.value });
        this.props.onUpdate(data);
    };

    handleBlur = (event) => {
        event.preventDefault();
        this.props.handleOnBlur(event.target.id, true);
    };

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input
                    id={this.props.id}
                    type={this.props.type}
                    value={this.props.value || this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className="form-control form-control-sm"
                    autoComplete="off"
                    disabled={this.props.disabled || ''}
                />
            </div>
        )
    }
}