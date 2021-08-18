// Libs
import React, { useState } from 'react';

// Components
import Form from './components/Form/Form';
import Chart from './components/Chart/Chart';

// Services
import { timeService } from '../../lib/TimeService/TimeService';

// Hooks
import { useChartData } from './hooks/useChartData/useChartData';

// Redux
import { connect } from 'react-redux';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';

// Types
import { timeUnit } from '../../lib/TimeService/TimeService.types';
import { DataOverviewProps, group } from './DataOverview.types';
import { onChangeHandler } from '../../../interfaces/components/SemanticInput';

const DataOverview = ({ timeEntries }: DataOverviewProps) => {
    const { timeUnits } = timeService;
    const [timeUnit, setTimeUnit] = useState<timeUnit>(timeUnits[2]);
    const [group, setGroup] = useState<group>('tasks');
    const chartData = useChartData(timeEntries, group, timeUnit);

    const handleTimeUnitSelect: onChangeHandler = (_event, { value }) => {
        // @ts-ignore
        setTimeUnit(value);
    }

    const handleGroupSelect: onChangeHandler = (_event, { value }) => {
        // @ts-ignore
        setGroup(value);
    }

    return (<>
        { typeof timeEntries !== 'undefined' && timeEntries.length > 0 &&
        <div className="tab-container">
            <Form handleTimeUnitSelect={handleTimeUnitSelect}
                  handleGroupSelect={handleGroupSelect}
                  selectedGroup={group}
                  selectedTimeUnit={timeUnit} />
            <Chart data={chartData} />
        </div> }
    </>);
};

const mapStateToProps = (state: any) => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps)(DataOverview);
