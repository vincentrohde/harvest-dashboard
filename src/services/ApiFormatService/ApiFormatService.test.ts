import apiFormatService from '@/services/ApiFormatService/ApiFormatService';

describe('getTimeEntryInSubmitFormat', () => {
    it('Time entry is returned in the format required by the Harvest API V2', () => {
        const unformattedTimeEntry = {
            notes: 'This is a test entry',
            id: 1,
            spent_date: '01.01.2022',
            hours: '1:00',
            project_id: '100',
            task_id: '100',
        };

        const timeEntryInApiFormat = {
            ...unformattedTimeEntry,
            spent_date: '2022-01-01', // date is in ISO8601 format
            hours: 1, // hours are converted to a number
            project_id: 100, // project_id is converted to a number
            task_id: 100, // task_id is converted to a number
        };

        expect(apiFormatService.getTimeEntryInSubmitFormat(unformattedTimeEntry))
            .toStrictEqual(timeEntryInApiFormat);
    });
});
