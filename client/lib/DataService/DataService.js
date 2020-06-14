class DataService {
    addEntryToDate (dates, entry) {
        if (!dates[entry.spent_date]) {
            dates[entry.spent_date].entries = [];
        }

        dates[entry.spent_date].entries.push(entry);
    }

    addTaskDataToDate (date, task, hours) {
        if (!date.tasks[task]) {
            date.tasks[task] = 0;
        }

        date.tasks[task] += hours;
    }

    getDaySummaryDataFromEntries (entries) {
        const dates = {};
        entries.forEach((entry) => {
            this.addEntryToDate(dates, entry);
        });

        for (let [key, value] of Object.entries(dates)) {
            dates[key].data = {};
            dates[key].entries.forEach((entry) => {
                dates[key].tasks = {};
                this.addTaskDataToDate(dates[key], entry.task.id, entry.hours)
            })
        }
    }
}

export const dataService = new DataService();