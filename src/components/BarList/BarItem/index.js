import React from 'react';
import './style.css';

const BarItem = (props) => (
    <React.Fragment>
        <div className="bar-title"><span>{props.item.title}</span></div>
        <div className="bar-body">
            <p><b>Open:</b> {props.item.opensIn}</p>
            <p><b>Close:</b> {props.item.closesIn}</p>
            <p><b>Email:</b>{props.item.email}</p>
            <p><b>Phone:</b>{props.item.phone}</p>
        </div>
    </React.Fragment>
);

export default BarItem;
