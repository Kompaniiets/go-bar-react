import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BarItem from './BarItem';
import './style.css';

export default class BarList extends Component {
    render() {
        return (
            <div className="bar-list">
                {this.props.items.map(item => (
                    <div className="single-bar" key={item.id}>
                        <Link to={`/bars/${item.id}`}>
                            <BarItem item={item}/>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}

