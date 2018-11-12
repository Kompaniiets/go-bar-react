import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import BarItem from '../BarList/BarItem';
import BarTables from '../BarList/BarTables';
import DateTimePicker from 'react-datetime-picker';
import './style.css';

export default class BarDetails extends Component {
    state = {
        item: {
            tables: []
        },
        date: new Date(),
        time: 30,
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.sendData(id, this.state.date, this.state.time);
    }

    sendData = (id, date, time) => {
        HttpService.get(`users/bars/${id}`, {
            date: date,
            time: time
        })
            .then(res => {
                const arr = {
                    id: res.data.id,
                    title: res.data.title,
                    info: res.data.info,
                    opensIn: res.data.opensIn,
                    closesIn: res.data.closesIn,
                    numberOfTables: res.data.numberOfTables,
                    lat: res.data.lat,
                    lng: res.data.lng,
                    email: res.data.bar.email,
                    phone: res.data.bar.phone,
                    tables: res.data.tables
                };

                this.setState({ item: arr });
            })
            .catch((err) => console.log('err ', err));
    };

    onDateChange = date => this.setState({ date });

    onDurationChange = item => this.setState({ time: item.target.value });

    onBookTable = () => {
        const { id } = this.props.match.params;
        this.sendData(id, this.state.date, this.state.time);
    };

    render() {
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
                            <div>
                                <label htmlFor="duration"><b>Select duration in minutes: </b></label>
                                <input id="duration"
                                       type="number"
                                       min="30"
                                       max="300"
                                       step="30"
                                       value={this.state.time}
                                       onChange={this.onDurationChange}
                                />
                            </div>
                        </div>
                        <div className="booked-table-button">
                            <button
                                className="btn btn-success btn-sm"
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

