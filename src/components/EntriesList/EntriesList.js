import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEditEntry, updateTimeEntry } from '../../stores/actions/timeEntries';
import { TimeHelper } from '../../helpers';
import Entry from '../Entry/Entry';
import MetaDataHeader from './MetaDataHeader/MetaDataHeader';

import style from './EntriesList.scss';

export class EntriesList extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.reducers = this.props.reducers;
        this.element = React.createRef();
        this.totalTime = 0;
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

    setTotalTimeForAllEntries (entries) {
        this.totalTime = this.getTotalTimeForAllEntries(entries);
    }

    getTotalTimeForAllEntries (entries) {
        let hours = 0;
        entries.forEach(entry => hours += entry.hours);

        return TimeHelper.hoursToHoursAndMinutes(hours);
    }

    render () {
        const { editEntry } = this.props.timeEntries;
        const { timeEntries } = this.props.timeEntries;

        if (timeEntries) {
            this.setTotalTimeForAllEntries(timeEntries);
        }

        return (
            <section className="EntriesList" ref={this.element} >
                { timeEntries && (
                    <div>
                        <MetaDataHeader totalTime={this.totalTime} entriesAmount={timeEntries.length} />
                        <div className="entries-container">
                            {
                                timeEntries.map((entry, index) => {
                                    return (<Entry
                                        key={index}
                                        information={entry}
                                        isEdit={entry.id === Number(editEntry)}
                                        isNew={false}
                                        reducers={this.props.updateTimeEntry}
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
    updateEditEntry,
    updateTimeEntry
};

export default connect(null, mapDispatchToProps)(EntriesList);