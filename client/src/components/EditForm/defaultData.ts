import { timeService } from '@services/TimeService/TimeService';

export const defaultData = {
    notes: '',
    hours: '0:00',
    project_id: '',
    task_id: '',
    spent_date: timeService.getCurrentDate()
};
