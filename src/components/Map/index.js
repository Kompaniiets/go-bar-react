import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GetCurrentLocation from '../../helpers/getCurrentLocation';
import config from './../../config';
import MarkerInfoContainer from './MarkerInfo';
import MarkerDataContainer from './MarkerData';
import HttpService from '../../services/httpServices';
import './style.css';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: {},
        markers: []
    };

    componentDidMount() {
        GetCurrentLocation()
            .then((location) => this.setState({
                center: location,
            })).catch((error) => console.log('Can`t get current geo location ', error));

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
                        lat: item.lat,
                        lng: item.lng,
                    }
                });

                this.setState({ markers: arr });
            })
            .catch((err) => console.log('err ', err));
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onInfoWindowClose = () => {
        this.setState({
            showingInfoWindow: false
        });
    };

    onMapClicked = (props, map, coord) => {
        let { latLng } = coord;
        const lat = latLng.lat(), lng = latLng.lng();

        if (this.state.markers.length < 10) {
            this.setState(previousState => {
                return {
                    showingInfoWindow: false,
                    markers: [
                        ...previousState.markers,
                        {
                            id: null,
                            title: 'Title',
                            info: '',
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
                <Map google={this.props.google} zoom={14}
                     onClick={this.onMapClicked}
                     center={this.state.center}
                     className={'map-style'}>

                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            title={marker.title}
                            name={marker.info}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={this.onMarkerClick}
                        />
                    ))}

                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <MarkerInfoContainer place={this.state.selectedPlace}/>
                    </InfoWindow>
                </Map>
                <MarkerDataContainer markers={this.state.markers} onUpdate={this.onUpdate}
                                     onDelete={this.onMarkerDelete} onSaveMarker={this.onSaveMarker}/>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (config.google.API_KEY)
})(MapContainer)