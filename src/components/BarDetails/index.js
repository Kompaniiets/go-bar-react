import React, { Component } from 'react';
import HttpService from '../../services/httpServices';
import BarItem from '../BarList/BarItem';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import './style.css';

export default class BarDetails extends Component {
    state = {
        item: {},
        date: new Date(),
        time: '12:00',
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        HttpService.get(`users/bars/${id}`)
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
                };

                this.setState({ item: arr });
            })
            .catch((err) => console.log('err ', err));
    }

    onDateChange = date => {
        if (!date)
            date = new Date();

        this.setState({ date });
    };

    onDurationChange = time => {
        if (!time)
            time = '12:00';

        this.setState({ time });
        console.log(time)
    };

    onBookTable = () => {
        const d = moment(this.state.date).utc();
        console.log(d);
    };

    render() {
        return (
            <div className="bar-details-wrapper">
                <BarItem item={this.state.item}/>
                <div className="bar-description">
                    <b>Description: </b>{this.state.item.info}
                </div>
                <div className="date-time-wrapper">
                    <div className="date-time">
                        <label htmlFor="date-pick"><b>Select date and time: </b></label>
                        <DateTimePicker
                            id="date-pick"
                            onChange={this.onDateChange}
                            value={this.state.date}
                        />
                    </div>
                    <div>
                        <label htmlFor="duration"><b>Select duration in minutes: </b></label>
                        <input id="duration" type="number" min="30" max="300" step="30"/>
                    </div>
                </div>
                <div>
                    <button
                        className="btn btn-success btn-sm"
                        onClick={this.onBookTable}>
                        Book table
                    </button>
                </div>
            </div>
        )
    }
}

