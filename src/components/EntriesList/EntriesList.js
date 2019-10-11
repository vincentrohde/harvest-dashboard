import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './EntriesList.scss';

import Entry from "../Entry/Entry";

class EntriesList extends Component {
    constructor (props) {
        super();
        this.props = props;
    }

    render () {
        if (this.props.entries.timeEntries) {
            this.entries = this.props.entries.timeEntries;
        }

        return (
            <section className="EntriesList">
                <div className="header tab-container">
                    { this.entries && (
                        <p className="meta-data pipes">
                            <span>{ this.entries.length } Entries</span>
                            <span>Total Time</span>
                        </p>
                    )}
                </div>
                <div className="entries-container">
                    {
                        this.entries &&
                        this.entries.map((entry, index) => {
                            return (<Entry key={index} information={entry} />);
                        })
                    }
                </div>
            </section>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(EntriesList);