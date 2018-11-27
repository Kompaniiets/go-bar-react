import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import config from '../../../config';
import MarkerInfoContainer from '../MarkerInfo';
import { ErrorHandler } from '../../../services/ResponseHandler';
import axios from 'axios';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: {},
        markers: []
    };

    componentDidMount() {
        axios.get('http://ip-api.com/json')
            .then((result) => {
                const location = {
                    lat: result.data.lat,
                    lng: result.data.lon,
                };
                this.setState({ center: location });
                this.props.onGetCenter(location);
            })
            .catch((error) => ErrorHandler(400, error));
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onInfoWindowClose = () => this.setState({ showingInfoWindow: false });

    onMapClicked = (props, map, coord) => this.props.onMapClicked(props, map, coord);

    renderChildren() {
        const { children } = this.props;
        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

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
                        opensIn={marker.schedule.opensIn}
                        closesIn={marker.schedule.closesIn}
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
                {this.renderChildren()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (config.google.API_KEY)
})(MapContainer)