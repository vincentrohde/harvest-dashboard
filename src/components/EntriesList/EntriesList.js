import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEditEntry } from '../../stores/actions/timeEntries';

import style from './EntriesList.scss';

import Entry from '../Entry/Entry';

class EntriesList extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.reducers = this.props.reducers;
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
            const editAction = element.closest('p.edit');
            const entry = element.closest('.Entry');

            if (entry && editAction) {
                const id = Number(entry.dataset.id);
                this.props.updateEditEntry(id);
            }
        });
    }

    render () {
        let entries;
        if (this.props.timeEntries.timeEntries) {
            entries = this.props.timeEntries;
        }

        return (
            <section
                className="EntriesList"
                ref={this.element}
            >
                { this.props.timeEntries.timeEntries && (
                    <div>
                        <div className="header tab-container">
                            <p className="meta-data pipes">
                                <span>{ entries.timeEntries.length } Entries</span>
                                <span>Total Time</span>
                            </p>
                        </div>
                        <div className="entries-container">
                            {
                                entries.timeEntries.map((entry, index) => {
                                    return (<Entry
                                        key={index}
                                        information={entry}
                                        isEdit={entry.id === Number(entries.editEntry)}
                                        isNew={false}
                                        reducers={this.reducers}
                                    />);
                                })
                            }
                        </div>
                    </div>
                )}
            </section>
        )
    }
};

const mapDispatchToProps = {
    updateEditEntry
};

export default connect(null, mapDispatchToProps)(EntriesList);