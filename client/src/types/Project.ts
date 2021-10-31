import {groupsType, GroupInterface} from './Group';

export type projectsType = groupsType;

export interface ProjectInterface extends GroupInterface {}

export type projectsByHours = ProjectByHours[];

export interface ProjectByHours {
    project: string;
    hours: number;
}
