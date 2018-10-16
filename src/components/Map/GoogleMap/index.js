import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GetCurrentLocation from '../../../helpers/getCurrentLocation';
import config from '../../../config';
import MarkerInfoContainer from '../MarkerInfo';

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
    }

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
        this.props.onMapClicked(props, map, coord);
    };

    render() {
        return (
            <Map google={this.props.google} zoom={14}
                 onClick={this.onMapClicked}
                 center={this.state.center}
                 className={'map-style'}>

                {this.props.markers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.title}
                        name={marker.info}
                        opensIn={marker.opensIn}
                        closesIn={marker.closesIn}
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
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (config.google.API_KEY)
})(MapContainer)