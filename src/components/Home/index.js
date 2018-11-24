import React, { Component } from 'react';
import GoogleMap from '../Map/GoogleMap';
import HttpService from '../../services/httpServices';
import Search from '../Search';
import BarList from '../BarList';
import BarModel from '../../models/bar';
import UserModel from '../../models/user';
import ScheduleModel from '../../models/schedule';
import PaginationModel from '../../models/pagination';
import Pagination from '../Pagination';
import './style.css';

export default class Home extends Component {
    state = {
        markers: [],
        coords: {},
        pagination: { ...PaginationModel({}) }
    };

    getBars = (position, offset = this.state.pagination.offset, limit = this.state.pagination.limit) => {
        HttpService.get('bars/list', {
            ...position,
            limit,
            offset
        }).then(res => {
            const arr = res.data.map(item => ({
                ...BarModel(item),
                user: { ...UserModel(item.user) },
                schedule: { ...ScheduleModel(item.schedule) },
            }));

            this.setState({
                markers: arr,
                pagination: PaginationModel({ ...res.pagination })
            });
        }).catch(err => console.log(err));
    };

    updatePage = (offset, currentPage) => {
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                currentPage: currentPage
            }
        }));
        this.getBars(this.state.coords, offset);
    };

    onGetCenter = (coords) => {
        this.setState({
            coords: {
                lat: coords.lat,
                lng: coords.lng,
                radius: coords.radius,
            },
        });

        this.getBars({ ...this.state.coords });
    };

    onMapClicked = (event) => {
    };

    render() {
        return (
            <div className="home-wrapper">
                <div className="paging-list">
                    <BarList items={this.state.markers}/>
                    <Pagination pagination={this.state.pagination} updatePage={this.updatePage}/>
                </div>

                <div className="home-map">
                    <GoogleMap onMapClicked={this.onMapClicked} markers={this.state.markers}
                               onGetCenter={this.onGetCenter}>
                        <Search {...this.props} getBars={this.getBars}/>
                    </GoogleMap>
                </div>
            </div>
        )
    }
}

