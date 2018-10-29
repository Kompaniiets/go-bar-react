import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(fas);

export default class Search extends Component {
    state = {
        radius: 2
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    onRadiusChange = (event) => {
        this.setState({
            radius: parseInt(event.target.value, 10)
        });
    };

    renderAutoComplete = () => {
        const { google, map } = this.props;

        if (!google || !map) return;

        const autoComplete = new google.maps.places.Autocomplete(this.autoComplete);
        autoComplete.bindTo('bounds', map);

        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();

            if (!place.geometry) return;

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(14);
            }

            this.props.getBars({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                radius: this.state.radius,
            });
        });
    };

    render() {
        return (
            <div className="search-wrapper">
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="radius"><FontAwesomeIcon icon={fas.faCircleNotch} /></label>
                    <input
                        id="radius"
                        placeholder="Radius"
                        min="2"
                        max="20"
                        value={this.state.radius}
                        onChange={this.onRadiusChange}
                        type="number"
                    />
                    <label htmlFor="place"><FontAwesomeIcon icon={fas.faCompass} /></label>
                    <input
                        id="place"
                        placeholder="Enter a location"
                        ref={ref => (this.autoComplete = ref)}
                        type="text"
                    />
                </form>
            </div>
        )
    }
}

