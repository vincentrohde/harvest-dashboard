import React, { Component } from 'react';
import { connect, actions } from "../../stores/Store";

class Entries extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.entries = props.data;
        actions.addState(this.entries);
    }

    render () {
        const { timeEntries } = this.props;

        console.log('### timeEntries: ', timeEntries);

        return (
            <section className="Entries">
                <h3 className="title">{ this.entries.length } Entries</h3>
            </section>
        )
    }
};

export default connect(({ timeEntries }) => ({ timeEntries }))(Entries);