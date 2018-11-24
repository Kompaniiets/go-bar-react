import React from 'react';
import './style.css';

const getTime = (date) => new Date(date).toTimeString().split(' ')[0];

const BarTables = (props) => (
    <React.Fragment>
        {props.item.tables.map((item, index) => (
            Object.keys(item).length ?
                <div key={index} className="single-table booked-table">
                    <div className="table-content">
                        from: {getTime(item.startAt)} <br/>
                        to: {getTime(item.endAt)}
                    </div>
                </div> :
                <div key={index} className="single-table free-table">
                    <div className="table-content">Free</div>
                </div>
        ))}
    </React.Fragment>
);

export default BarTables;
