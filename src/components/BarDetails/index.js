import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import BarItem from '../BarList/BarItem';
import BarTables from '../BarList/BarTables';
import DateTimePicker from 'react-datetime-picker';
import { Auth } from '../../services/AuthService';
import BarModel from '../../models/bar';
import UserModel from '../../models/user';
import ScheduleModel from '../../models/schedule';
import './style.css';

export default class BarDetails extends Component {
    state = {
        item: {
            ...BarModel({}),
            user: {...UserModel({})},
            schedule: {...ScheduleModel({})},
            tables: []
        },
        date: new Date(),
        duration: 30,
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.sendData(id, this.state.date, this.state.duration);
    }

    sendData = (id, date, duration) => {
        HttpService.get(`bars/${id}/info`, {
            date: date,
            duration: duration
        })
            .then(res => {
                const item = {
                    ...BarModel(res.data),
                    user: {...UserModel(res.data.user)},
                    schedule: {...ScheduleModel(res.data.schedule)},
                    tables: res.data.tables
                };
                this.setState({ item: item });
            })
            .catch((err) => console.log('err ', err));
    };

    onDateChange = date => {
        if(!date)
            date = new Date();
        this.setState({ date });
    };

    onDurationChange = item => this.setState({ duration: item.target.value });

    onCheckTable = () => {
        const { id } = this.props.match.params;
        this.sendData(id, this.state.date, this.state.duration);
    };

    onBookTable = () => {
        const { id } = this.props.match.params;
        HttpService.post('users/bars', {
            id: parseInt(id, 10),
            date: this.state.date,
            duration: this.state.duration
        })
            .then(res => {
                const item = {
                    ...BarModel(res.data),
                    user: {...UserModel(res.data.user)},
                    schedule: {...ScheduleModel(res.data.schedule)},
                    tables: res.data.tables
                };
                this.setState({ item: item });
            })
            .catch((err) => console.log('err ', err));
    };

    render() {
        const isAuth = !Auth.loggedIn();

        return (
            <div className="bar-details-wrapper">
                <div className="bar-title"><span>{this.state.item.title}</span></div>
                <div className="bar-details-container">
                    <div className="bar-details-info">
                        <BarItem item={this.state.item}/>
                        <div className="bar-description">
                            <b>Description: </b>{this.state.item.info}
                        </div>
                        <div className="date-time-wrapper">
                            <div className="date-time">
                                <p><b>Select date and time: </b></p>
                                <DateTimePicker
                                    id="date-pick"
                                    onChange={this.onDateChange}
                                    value={this.state.date}
                                />
                            </div>
                            <div className="duration-wrapper">
                                <label htmlFor="duration"><b>Duration in minutes: </b></label>
                                <input id="duration"
                                       type="number"
                                       min="30"
                                       max="300"
                                       step="30"
                                       value={this.state.duration}
                                       onChange={this.onDurationChange}
                                />
                            </div>
                        </div>
                        <div className="booked-table-button">
                            <button
                                className="btn btn-success btn-sm"
                                onClick={this.onCheckTable}>
                                Check free table
                            </button>
                            <button
                                className="btn btn-success btn-sm"
                                disabled={isAuth}
                                onClick={this.onBookTable}>
                                Book table
                            </button>
                        </div>
                    </div>
                    <div className="tables-wrapper" >
                        <BarTables item={this.state.item} />
                    </div>
                </div>
            </div>
        )
    }
}

