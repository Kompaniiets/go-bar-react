import React, { Component } from 'react';
import HttpService from '../../../services/httpServices';
import './style.css';
import { SuccessHandler } from "../../../services/ResponseHandler";

export default class UploadLogo extends Component {
    state = {
        file: null
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        if (!this.state.file) return;

        const formData = new FormData();
        formData.append('image', this.state.file);

        HttpService.put('users/bars/avatar', formData, {
            'content-type': 'multipart/form-data'
        })
            .then(res => {
                SuccessHandler('Avatar successfully upload!');
                return res;
            })
            .then(res => this.props.onProfileUpdate({ id: 'avatarUrl', value: res.data.avatarUrl }))
            .catch();
    };

    onChange = (e) => this.setState({ file: e.target.files[0] });

    render() {
        return (
            <div className="avatar-style">
                <img src={this.props.avatarUrl ? this.props.avatarUrl : ''} alt=""/>
                <form onSubmit={this.onFormSubmit}>
                    <input type="file" name="myImage" onChange={this.onChange}/>
                    <button type="submit" className="btn-style">Upload</button>
                </form>
            </div>
        )
    }
}
