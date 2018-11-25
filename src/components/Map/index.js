import React, { Component } from 'react';
import MarkerDataContainer from './MarkerData';
import HttpService from '../../services/httpServices';
import GoogleMap from './GoogleMap';
import BarModel from '../../models/bar';
import ScheduleModel from '../../models/schedule';
import PaginationModel from '../../models/pagination';
import Pagination from '../Pagination';
import './style.css';

export default class MapContainer extends Component {
    state = {
        markers: [{
            ...BarModel({}),
            schedule: { ...ScheduleModel({}) },
        }],
        pagination: { ...PaginationModel({}) }
    };

    componentDidMount() {
        this.getUserLocations();
    }

    getUserLocations = (offset = 0, limit = 3) => {
        HttpService.get('users/locations', {
            limit,
            offset
        })
            .then(res => {
                const arr = res.data.map(item => ({
                    ...BarModel(item),
                    schedule: { ...ScheduleModel(item.schedule) },
                }));

                res.pagination.limit = limit;
                const paging = Object.assign(this.state.pagination, res.pagination);

                this.setState({
                    markers: arr,
                    pagination: paging
                });
            })
            .catch((err) => console.log(err));
    };

    onMapClicked = (props, map, coord) => {
        let { latLng } = coord;
        const lat = latLng.lat(), lng = latLng.lng();

        if (this.state.markers.length < 10) {
            this.setState(previousState => ({
                markers: [
                    ...previousState.markers,
                    {
                        ...BarModel({
                            title: 'Title',
                            lat,
                            lng
                        }),
                        schedule: { ...ScheduleModel({ numberOfTables: 1 }) },
                    }
                ]
            }));
        }
    };

    onUpdate = (arr) => this.setState({ markers: arr });

    onMarkerDelete = (index) => {
        const item = this.state.markers[index];
        if (item.id === null) {
            this.deleteLocationFromArray(index);
            return;
        }

        HttpService.del(`users/locations/${item.id}`)
            .then(() => this.deleteLocationFromArray(index))
            .catch((err) => console.log(err));
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

    updatePage = (offset, currentPage) => {
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                currentPage: currentPage
            }
        }));

        this.getUserLocations(offset);
    };

    onGetCenter = (coords) => {};

    render() {
        return (
            <React.Fragment>
                <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers} onGetCenter={this.onGetCenter}/>
                <div className="marker-pagination">
                    <MarkerDataContainer markers={this.state.markers} onUpdate={this.onUpdate}
                                         onDelete={this.onMarkerDelete} onSaveMarker={this.onSaveMarker}/>
                    <Pagination pagination={this.state.pagination} updatePage={this.updatePage}/>
                </div>
            </React.Fragment>
        );
    }
}
