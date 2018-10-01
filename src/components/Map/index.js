import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GetCurrentLocation from '../../helpers/getCurrentLocation';
import config from './../../config';
import MarkerInfoContainer from './MarkerInfo';
import MarkerDataContainer from './MarkerData';
import './style.css';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: { },
        markers: [
            {
                title: 'one',
                name: 'name 1',
                position: {
                    lat: 49.988457,
                    lng: 36.232417
                }
            },
            {
                title: 'two',
                name: 'name 2',
                position: {
                    lat: 49.985856,
                    lng: 36.227568
                }
            }
        ]
    };

    onMarkerClick = (props, marker, e) => {
        console.log(props);
        console.log(marker);
        console.log(e);
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

    onMapClicked = async (props, map, coord) => {
        let { latLng } = coord;
        const lat = latLng.lat(), lng = latLng.lng();

        if (this.state.markers.length < 10) {
            this.setState(previousState => {
                return {
                    showingInfoWindow: false,
                    markers: [
                        ...previousState.markers,
                        {
                            title: '',
                            name: '',
                            position: { lat, lng }
                        }
                    ]
                };
            });
        }
    };

    componentDidMount() {
        GetCurrentLocation()
            .then((location) => this.setState({
                center: location,
            })).catch((error) => console.log('Can`t get current geo location ', error));
    }

    onUpdate = (event) => {
        // console.log(event);
        // console.log('------------');
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
                            name={marker.name}
                            position={marker.position}
                            onClick={this.onMarkerClick}
                        />
                    ))}

                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <MarkerInfoContainer place={this.state.selectedPlace} />
                        </div>
                    </InfoWindow>
                </Map>
                <MarkerDataContainer markers={this.state.markers} onUpdate={this.onUpdate} />
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (config.google.API_KEY)
})(MapContainer)