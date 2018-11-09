import React, { Component } from 'react';
import GoogleMap from '../Map/GoogleMap';
import HttpService from '../../services/httpServices';
import GetCurrentLocation from '../../helpers/getCurrentLocation';
import Search from '../Search';
import BarList from '../BarList';
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
        const{ lat, lng, radius} = position;

        HttpService.get('users/bars', {
            lat, lng, radius
        })
            .then(res => {
                const arr = res.data.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        info: item.info,
                        opensIn: item.opensIn,
                        closesIn: item.closesIn,
                        numberOfTables: item.numberOfTables,
                        lat: item.lat,
                        lng: item.lng,
                        email: item.bar.email,
                        phone: item.bar.phone,
                    }
                });

                this.setState({ markers: arr });
            })
            .catch((err) => console.log('err ', err));
    };

    onMapClicked = (event) => {
    };

    render() {
        return (
            <div className="home-wrapper">
                <BarList items={this.state.markers} />
                <div className="home-map">
                    <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers}>
                        <Search {...this.props} getBars={this.getBars} />
                    </GoogleMap>
                </div>
            </div>
        )
    }
}

