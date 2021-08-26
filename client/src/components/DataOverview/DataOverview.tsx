// Libs
import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Components
import Form from './components/Form/Form';
import Chart from './components/Chart/Chart';
import TabContainer from '@/components/presentation/TabContainer/TabContainer';

// Services
import { timeService } from '@/services/TimeService/TimeService';

// Hooks
import { useChartData } from './hooks/useChartData/useChartData';

// Redux
import { timeEntriesSelector } from '@/stores/selectors/timeEntries';

// Types
import { timeUnit } from '@/services/TimeService/TimeService.types';
import { DataOverviewProps, group, groups } from './DataOverview.types';
import { onChangeHandler } from '@/types/components/SemanticInput';

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
        (<Grid.Column mobile={16} tablet={16} computer={16}>
            <TabContainer title={'Entry Summary'} caption={'by hours'}>
                <Form groups={groups}
                      selectedGroup={group}
                      selectedTimeUnit={timeUnit}
                      handleTimeUnitSelect={handleTimeUnitSelect}
                      handleGroupSelect={handleGroupSelect} />
                <Chart data={chartData} />
            </TabContainer>
        </Grid.Column>) }
    </>);
};

const mapStateToProps = (state: any) => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps)(DataOverview);
