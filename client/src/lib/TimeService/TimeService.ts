import moment from 'moment';

class TimeService {
    hoursToHoursAndMinutes (hours: number | string): string {
        const totalMinutes = Number(hours) * 60;

        const convertedHours = String(Math.floor(totalMinutes / 60));
        let convertedMinutes = String(Math.round(totalMinutes % 60));

        if (convertedMinutes.toString().length == 1) {
            convertedMinutes = '0' + convertedMinutes.toString();
        }

        return `${convertedHours}:${convertedMinutes}`;
    }

    hoursAndMinutesToHours (time: string): number {
        const timeComponents = time.split(':').map(i=>Number(i));
        const dec = parseInt(String((timeComponents[1] / 6) * 10), 10);

        const hours = parseFloat(parseInt(String(timeComponents[0]), 10)
            + '.' + (dec<10?'0':'') + dec);

        return Number(hours);
    }

    iso8601ToDDMMYYY (date: string): string {
        const isDDMMYYYY = moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY') === date;

        if (isDDMMYYYY) {
            return date;
        }

        return moment(date).format('DD.MM.YYYY');
    }

    ddMMYYYYToISO8601 (date: string): string {
        const isISO8601 = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;

        if (isISO8601) {
            return date;
        }

        return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
    }

    getDateFromDaysAgo (days: number, format: string = 'DD-MM-YYYY') {
        return moment().subtract(days,'days').format(format);
    }

    getCurrentDate (format: string = 'YYYY-MM-DD') {
        return moment().format(format);
    }
}

export const timeService = new TimeService();