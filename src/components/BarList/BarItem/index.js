import React from 'react';
import './style.css';

const BarItem = (props) => (
    <React.Fragment>
        <div className="bar-title"><span>{props.item.title}</span></div>
        <div className="bar-body">
            <p><b>Open:</b> {props.item.schedule.opensIn}</p>
            <p><b>Close:</b> {props.item.schedule.closesIn}</p>
            <p><b>Email:</b>{props.item.user.email}</p>
            <p><b>Phone:</b>{props.item.user.phone}</p>
        </div>
    </React.Fragment>
);

export default BarItem;
