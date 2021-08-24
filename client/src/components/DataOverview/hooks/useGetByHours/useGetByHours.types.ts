import { timeEntriesType } from '../../../../types/TimeEntry';
import { tasksByHours } from '../../../../types/Task';
import { projectsByHours } from '../../../../types/Project';

export type getByHours = (entries: timeEntriesType) => tasksByHours | projectsByHours;
