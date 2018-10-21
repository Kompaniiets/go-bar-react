import React, { Component } from 'react';
import GoogleMap from '../Map/GoogleMap';
import HttpService from '../../services/httpServices';
import './style.css';

export default class Home extends Component {
    state = {
        markers: []
    };

    componentDidMount() {
        this.getAllBar();
    }

    getAllBar = () => {
        HttpService.get('users/bars')
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
                    }
                });

                this.setState({ markers: arr });
            })
            .catch((err) => console.log('err ', err));
    };

    render() {
        return (
            <div className="home-map">
                <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers} />
            </div>
        )
    }
}

