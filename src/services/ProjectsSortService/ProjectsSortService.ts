// Libs
import { timeEntriesType } from '@/types/TimeEntry';

// Types
import { projectsByHours } from '@/types/Project';

class ProjectsSortService {
    getEntriesWithProject(entries: timeEntriesType): projectsByHours {
        return entries.map(entry => ({
            project: entry.project.name,
            hours: entry.hours
        }));
    }

    getUniqueProjectsFromEntries(entries: projectsByHours) {
        const projectsOnlyList = entries.map(entry => entry.project);
        // @ts-ignore
        return [...new Set(projectsOnlyList)];
    };

    getProjectsByHoursList (projects: string[]): projectsByHours {
        return projects.map((project) => ({
            project,
            hours: 0
        }));
    };

    addEntryHoursToProjects(entriesWithGroup: projectsByHours, projectsByHoursList: projectsByHours) {
        entriesWithGroup.forEach(entry => {
            projectsByHoursList.forEach((group) => {
                if (group.project == entry.project) {
                    group.hours += entry.hours;
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

const projectsSortService = new ProjectsSortService();

export default projectsSortService;
