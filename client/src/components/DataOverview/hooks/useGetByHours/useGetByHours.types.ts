import { timeEntriesType } from '../../../../../interfaces/TimeEntry';
import { tasksByHours } from '../../../../../interfaces/Task';
import { projectsByHours } from '../../../../../interfaces/Project';

export type getByHours = (entries: timeEntriesType) => tasksByHours | projectsByHours;
