import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './style.css';

export default class Pagination extends Component {
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.pagination.limit);

        this.props.updatePage(offset, selected);
    };

    render() {
        const pagination = this.props.pagination;
        const totalPages = pagination.total / pagination.limit;

        return (
            <div className="pagination-wrapper">
                {
                    pagination.total !== 0 ?
                        <ReactPaginate previousLabel={"<<"}
                                       nextLabel={">>"}
                                       breakLabel={"..."}
                                       breakClassName={"break-me"}
                                       pageCount={totalPages}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={2}
                                       onPageChange={this.handlePageClick}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"active"}/>
                        : ''
                }
            </div>
        )
    }
}