import React, { Component } from 'react';
import Input from '../../Input';
import './style.css';

export default class ViewProfile extends Component {
    onUpdate = (event) => {
        const arr = Array.from(this.props.markers);
        if (event.id !== 'lat' && event.id !== 'lng') {
            arr[event.key][event.id] = event.value;
        } else {
            arr[event.key][event.id] = parseFloat(event.value);
        }

        this.props.onUpdate(arr);
    };

    onDelete = (event) => {
        this.props.onDelete(event.target.value);
    };

    onSaveMarker = (event) => {
        this.props.onSaveMarker(event.target.value);
    };

    render() {
        return (
            <div className="marker-container">
                {
                    this.props.markers.map((marker, index) => (
                        <div key={index} className="marker-data">
                            <p>Location {index + 1}</p>
                            <Input id="title" dataKey={index} type="text" label="Title:"
                                   value={marker.title}
                                   onUpdate={this.onUpdate}
                            />
                            <Input id="info" dataKey={index} type="text" label="Info:"
                                   value={marker.info}
                                   onUpdate={this.onUpdate}
                            />
                            <Input id="lat" dataKey={index} type="" label="Lat:"
                                   value={marker.lat}
                                   onUpdate={this.onUpdate}
                            />
                            <Input id="lng" dataKey={index} type="text" label="Lng:"
                                   value={marker.lng}
                                   onUpdate={this.onUpdate}
                            />
                            <div className="marker-btn">
                                <button
                                    value={index}
                                    className="btn btn-success btn-sm"
                                    onClick={this.onSaveMarker}>
                                    Save
                                </button>
                                <button
                                    value={index}
                                    className="btn btn-danger btn-sm float-right"
                                    onClick={this.onDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
