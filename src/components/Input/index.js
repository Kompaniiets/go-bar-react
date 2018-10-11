import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default class Input extends Component {
    state = { value: '' };

    handleChange = (event) => {
        const data = {
            id: event.target.id,
            value: event.target.value
        };

        if (this.props.dataKey !== undefined) {
            data.key = this.props.dataKey;
        }

        this.props.onUpdate(data);
        this.setState({ value: event.target.value });
    };

    render() {
        const style = 'form-control form-control-sm';
        const classStyle = this.props.hasError ? style + ' is-invalid' : style;

        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input
                    id={this.props.id}
                    type={this.props.type}
                    value={this.props.value || this.state.value}
                    onChange={this.handleChange}
                    className={classStyle}
                    disabled={this.props.disabled || ''}
                />
            </div>
        )
    }
}