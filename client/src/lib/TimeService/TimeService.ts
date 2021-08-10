import moment from 'moment';

import { timeUnit } from './TimeService.types';

class TimeService {
    hoursToMinutes(hours: number | string): number {
        return Math.round(Number(hours) * 60);
    }

    minutesToHoursAndMinutes(minutes: number): string {
        const convertedHours = String(Math.floor(minutes / 60));
        let convertedMinutes = String(Math.round(minutes % 60));

        if (convertedMinutes.toString().length == 1) {
            convertedMinutes = '0' + convertedMinutes.toString();
        }

        return `${convertedHours}:${convertedMinutes}`;
    }

    hoursToHoursAndMinutes(hours: number | string): string {
        const totalMinutes = this.hoursToMinutes(hours);
        return this.minutesToHoursAndMinutes(totalMinutes);
    }

    hoursAndMinutesToHours(time: string): number {
        const timeComponents = time.split(':').map(i=>Number(i));
        const dec = parseInt(String((timeComponents[1] / 6) * 10), 10);

        const hours = parseFloat(parseInt(String(timeComponents[0]), 10)
            + '.' + (dec<10?'0':'') + dec);

        return Number(hours);
    }

    iso8601ToDDMMYYY(date: string): string {
        const isDDMMYYYY = moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY') === date;

        if (isDDMMYYYY) {
            return date;
        }

        return moment(date).format('DD.MM.YYYY');
    }

    ddMMYYYYToISO8601(date: string): string {
        const isISO8601 = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;

        if (isISO8601) {
            return date;
        }

        return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
    }

    getDateFromDaysAgo(days: number, format: string = 'DD-MM-YYYY') {
        return moment().subtract(days,'days').format(format);
    }

    getCurrentDate(format: string = 'YYYY-MM-DD') {
        return moment().format(format);
    }

    compareByTimeUnit(aDay: string, bDay: string, timeUnit: timeUnit) {
        const isBefore = moment(aDay).isBefore(bDay, timeUnit);
        const isAfter = moment(aDay).isAfter(bDay, timeUnit);

        if (isBefore) {
            return -1;
        }

        if (isAfter) {
            return 1;
        }

        return 0;
    }

    isSameDate(aDay: string, bDay: string) {
        return this.compareByTimeUnit(aDay, bDay, 'day') === 0;
    }
}

export const timeService = new TimeService();
