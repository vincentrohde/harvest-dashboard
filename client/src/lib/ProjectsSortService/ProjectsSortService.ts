// Libs
import { timeEntriesType } from '../../../interfaces/TimeEntry';

// Types
import { projectsByHours } from '../../../interfaces/Project';

class ProjectsSortService {
    getEntriesWithProject(entries: timeEntriesType): projectsByHours {
        return entries.map(entry => ({
            project: entry.project.name,
            hours: entry.hours
        }));
    }

    getUniqueProjectsFromEntries(entries: projectsByHours) {
        const projectsOnlyList = entries.map(entry => entry.project);
        return [...new Set(projectsOnlyList)];
    };

    getProjectsByHoursList (projects: string[]): projectsByHours {
        return projects.map((project) => ({
            project,
            hours: 0
        }));
    };

    addEntryHoursToProjects(entriesWithCategory: projectsByHours, projectsByHoursList: projectsByHours) {
        entriesWithCategory.forEach(entry => {
            projectsByHoursList.forEach((category) => {
                if (category.project == entry.project) {
                    category.hours += entry.hours;
                }
            });
        });
    }

    getProjectsByHours(entries: timeEntriesType): projectsByHours {
        const entriesWithProject = this.getEntriesWithProject(entries);
        const uniqueProjects = this.getUniqueProjectsFromEntries(entriesWithProject);

        let projectsByHoursList = this.getProjectsByHoursList(uniqueProjects);
        this.addEntryHoursToProjects(entriesWithProject, projectsByHoursList);

        return projectsByHoursList;
    };
}

export const projectsSortService = new ProjectsSortService();
