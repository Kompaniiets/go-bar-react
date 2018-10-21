import React, { Component } from 'react';
import MarkerDataContainer from './MarkerData';
import HttpService from '../../services/httpServices';
import GoogleMap from './GoogleMap';
import './style.css';

export default class MapContainer extends Component {
    state = {
        markers: []
    };

    componentDidMount() {
        this.getUserLocations();
    }

    getUserLocations = () => {
        HttpService.get('users/locations')
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

    onMapClicked = (props, map, coord) => {
        let { latLng } = coord;
        const lat = latLng.lat(), lng = latLng.lng();

        if (this.state.markers.length < 10) {
            this.setState(previousState => {
                return {
                    markers: [
                        ...previousState.markers,
                        {
                            id: null,
                            title: 'Title',
                            info: '',
                            opensIn: '',
                            closesIn: '',
                            numberOfTables: 1,
                            lat,
                            lng
                        }
                    ]
                };
            });
        }
    };

    onUpdate = (arr) => {
        this.setState({ markers: arr });
    };

    onMarkerDelete = (index) => {
        const item = this.state.markers[index];
        if (item.id === null) {
            this.deleteLocationFromArray(index);
            return;
        }

        HttpService.del(`users/locations/${item.id}`)
            .then(() => this.deleteLocationFromArray(index))
            .catch((err) => console.log('err ', err));
    };

    deleteLocationFromArray = (index) => {
        const arr = Array.from(this.state.markers);
        arr.splice(index, 1);

        this.setState({ markers: arr });
    };

    onSaveMarker = (index) => {
        const arr = this.state.markers[index];
        this.props.onSubmit(arr, 'locations');
    };

    render() {
        return (
            <React.Fragment>
                <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers} />
                <MarkerDataContainer markers={this.state.markers} onUpdate={this.onUpdate}
                                     onDelete={this.onMarkerDelete} onSaveMarker={this.onSaveMarker}/>
            </React.Fragment>
        );
    }
}
