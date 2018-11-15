import React, { Component } from 'react';
import GoogleMap from '../Map/GoogleMap';
import HttpService from '../../services/httpServices';
import GetCurrentLocation from '../../helpers/getCurrentLocation';
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

    componentDidMount() {
        GetCurrentLocation()
            .then((location) => {
                if (!location)
                    return;

                this.getBars({
                    lat: location.lat,
                    lng: location.lng,
                    radius: location.radius,
                });
            })
            .catch((error) => console.log('Can`t get current geo location ', error));
    }

    getBars = (position) => {
        HttpService.get('bars/list', {
            ...position
        })
            .then(res => {
                const arr = res.data.map(item => ({
                    ...BarModel(item),
                    user: { ...UserModel(item.user) },
                    schedule: { ...ScheduleModel(item.schedule) },
                }));

                this.setState({ markers: arr });
            })
            .catch();
    };

    onMapClicked = (event) => {
    };

    render() {
        return (
            <div className="home-wrapper">
                <BarList items={this.state.markers}/>
                <div className="home-map">
                    <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers}>
                        <Search {...this.props} getBars={this.getBars}/>
                    </GoogleMap>
                </div>
            </div>
        )
    }
}

