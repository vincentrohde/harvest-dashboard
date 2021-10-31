// Libs
import timeService from '@/services/TimeService/TimeService';

// Types
import {TimeEntrySubmissionInterface} from '@/types/TimeEntry';
import {EditFormEntry} from '@/components/domain/EditForm/EditForm.types';

class ApiFormatService {
    getTimeEntryInSubmitFormat(entry: EditFormEntry): TimeEntrySubmissionInterface {
        const {hours: inputHours, spent_date: inputDate} = entry;

        const convertedHours = timeService.hoursAndMinutesToHours(inputHours);
        const convertedDate = timeService.ddMMYYYYToISO8601(inputDate);

        return {
            ...entry,
            project_id: Number(entry.project_id),
            task_id: Number(entry.task_id),
            hours: convertedHours,
            spent_date: convertedDate,
        };
    }
}

const apiFormatService = new ApiFormatService();

export default apiFormatService;
