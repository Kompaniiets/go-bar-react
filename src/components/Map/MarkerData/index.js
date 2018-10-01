import React, { Component } from 'react';
import Input from '../../Input';
import './style.css';

export default class ViewProfile extends Component {
    state = {
        markers:
            {
                title: '',
                name: '',
                lat: '',
                lng: ''
            }
    };

    onUpdate = (event) => {
        this.setState({ [event.id]: event.value });
    };

    render() {
        return (
            <div className="marker-container">
                {
                    this.props.markers.map((marker, index) => (
                        <div key={index} className="marker-data">
                            <p>Location {index + 1}</p>
                            <Input id="title" type="text" label="Title:"
                                   value={marker.title}
                                   onUpdate={this.onUpdate}
                            />
                            <Input id="name" type="text" label="Name:"
                                   value={marker.name}
                                   onUpdate={this.onUpdate}
                            />
                            <Input id="lat" type="" label="Lat:"
                                   value={marker.position.lat}
                                   onUpdate={this.onUpdate}
                            />
                            <Input id="lng" type="text" label="Lng:"
                                   value={marker.position.lng}
                                   onUpdate={this.onUpdate}
                            />
                        </div>
                    ))
                }
            </div>
        )
    }
}
