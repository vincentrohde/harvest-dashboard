import { categoriesType, CategoryInterface } from './Category';

export type projectsType = categoriesType;

export interface ProjectInterface extends CategoryInterface {}

export type projectsByHours = ProjectByHours[];

export interface ProjectByHours {
    project: string;
    hours: number;
}
