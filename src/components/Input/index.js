import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css';

export default class Input extends Component {
    state = {
        value: '',
        hasError: false,
        isBlurred: false,
        errorMessage: ''
    };

    componentDidMount() {
        this.validateInput(this.state.value);
    }

    handleChange = (event) => {
        if (this.props.validation.length)
            this.validateInput(event.target.value);

        const data = {
            id: event.target.id,
            value: event.target.value
        };

        if (this.props.dataKey !== undefined)
            data.key = this.props.dataKey;

        this.props.onUpdate(data);
        this.setState({ value: event.target.value });
    };

    validateInput = (value) => {
        this.props.validation.forEach(item => {
            const result = item(value);

            if (result) {
                this.setState({
                    hasError: true,
                    errorMessage: result
                });
                this.props.handleError(true);
            } else {
                this.setState({
                    hasError: false,
                    errorMessage: ''
                });
                this.props.handleError(false);
            }
        });
    };

    hasErrorHandler = () => {
        this.props.handleError(true);
    };

    handleBlur = (event) => {
        event.preventDefault();
        this.setState({ isBlurred: true });
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
                <div className="form-error">
                    {this.state.hasError && this.state.isBlurred ? <p>{this.state.errorMessage}</p> : ''}
                </div>
            </div>
        )
    }
}