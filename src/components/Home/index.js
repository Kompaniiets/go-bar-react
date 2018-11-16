import React, { Component } from 'react';
import GoogleMap from '../Map/GoogleMap';
import HttpService from '../../services/httpServices';
import Search from '../Search';
import BarList from '../BarList';
import BarModel from '../../models/bar';
import UserModel from '../../models/user';
import ScheduleModel from '../../models/schedule';
import './style.css';

export default class Home extends Component {
    state = {
        markers: []
    };

    getBars = (position) => {
        HttpService.get('bars/list', {
            ...position
        }).then(res => {
            const arr = res.data.map(item => ({
                ...BarModel(item),
                user: { ...UserModel(item.user) },
                schedule: { ...ScheduleModel(item.schedule) },
            }));

            this.setState({ markers: arr });
        }).catch(err => console.log(err));
    };

    onGetCenter = (coords) => {
        this.getBars({
            lat: coords.lat,
            lng: coords.lng,
            radius: coords.radius,
        });
    };

    onMapClicked = (event) => {
    };

    render() {
        return (
            <div className="home-wrapper">
                <BarList items={this.state.markers}/>
                <div className="home-map">
                    <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers}
                               onGetCenter={this.onGetCenter}>
                        <Search {...this.props} getBars={this.getBars}/>
                    </GoogleMap>
                </div>
            </div>
        )
    }
}

