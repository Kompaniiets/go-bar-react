import React, { Component } from 'react';
import './style.css';

export default class Search extends Component {
    state = {
        radius: 2,
        place: null
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const place = this.state.place, { map } = this.props;

        if (!this.state.place || !place.geometry) return;

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
    };

    onRadiusChange = (event) => this.setState({ radius: parseInt(event.target.value, 10) });

    renderAutoComplete = () => {
        const { google, map } = this.props;

        if (!google || !map) return;

        const autoComplete = new google.maps.places.Autocomplete(this.autoComplete);
        autoComplete.bindTo('bounds', map);

        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            this.setState({ place: place });
        });
    };

    render() {
        return (
            <div className="search-wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="radius-btn-container">
                        <input
                            id="radius"
                            placeholder="Radius"
                            min="2"
                            max="20"
                            value={this.state.radius}
                            onChange={this.onRadiusChange}
                            type="number"
                        />
                        <input className="btn-style" type="submit" value="Go" />
                    </div>
                    <div>
                        <input
                            id="place"
                            placeholder="Enter a location"
                            ref={ref => (this.autoComplete = ref)}
                            type="text"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

