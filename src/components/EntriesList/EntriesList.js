import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './EntriesList.scss';

import Entry from "../Entry/Entry";

import { updateEditEntry } from "../../stores/actions/timeEntries";

class EntriesList extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.element = React.createRef();
    }

    componentDidMount () {
        this.initializeEventListeners();
    }

    initializeEventListeners () {
        this.handleEditModeForEntries();
    }

    handleEditModeForEntries () {
        const entryList = this.element.current;

        entryList.addEventListener('click', ({ target }) => {
            const element = target;
            const entry = element.closest('.Entry');
            if (entry && target.classList.contains('edit')) {
                const id = entry.dataset.id;
                this.props.updateEditEntry(id);
            }
        });
    }

    render () {
        if (this.props.timeEntries.timeEntries) {
            this.entries = this.props.timeEntries.timeEntries;
        }

        return (
            <section
                className="EntriesList"
                ref={this.element}
            >
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

                            return (<Entry
                                key={index}
                                information={entry}
                                isEdit={entry.id === Number(this.props.timeEntries.editEntry)}
                            />);
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

const mapDispatchToProps = { updateEditEntry };

export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);