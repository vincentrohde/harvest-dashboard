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
import { DataOverviewProps, group, groups } from './DataOverview.types';
import { onChangeHandler } from '../../../interfaces/components/SemanticInput';

const DataOverview = ({ timeEntries }: DataOverviewProps) => {
    const { timeUnits } = timeService;
    const groups: groups = ['tasks', 'projects'];
    const [timeUnit, setTimeUnit] = useState<timeUnit>(timeUnits[0]);
    const [group, setGroup] = useState<group>(groups[0]);
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
            <Form groups={groups}
                  selectedGroup={group}
                  selectedTimeUnit={timeUnit}
                  handleTimeUnitSelect={handleTimeUnitSelect}
                  handleGroupSelect={handleGroupSelect} />
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
