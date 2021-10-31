// Libs
import moment from 'moment';

// Types
import {timeUnit, dateRange} from './TimeService.types';

class TimeService {
    timeUnits: timeUnit[] = ['day', 'week', 'month', 'year'];

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
        const timeComponents = time.split(':').map((i) => Number(i));
        const dec = parseInt(String((timeComponents[1] / 6) * 10), 10);

        const hours = parseFloat(
            parseInt(String(timeComponents[0]), 10) + '.' + (dec < 10 ? '0' : '') + dec,
        );

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
        return moment().subtract(days, 'days').format(format);
    }

    getCurrentDate(format: string = 'YYYY-MM-DD') {
        return moment().format(format);
    }

    compareByTimeUnit(aDay: string, bDay: string, timeUnit: timeUnit = 'day') {
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

    isSameDateRange(aDay: string, bDay: string, timeUnit: timeUnit = 'day') {
        return this.compareByTimeUnit(aDay, bDay, timeUnit) === 0;
    }

    getDateRangeByTimeUnit(aDay: string, timeUnit: timeUnit = 'week') {
        let dateRange = '';

        switch (timeUnit) {
            case 'day':
                dateRange = moment(aDay, 'YYYY-MM-DD').format('DD.MM.YYYY');
                break;
            case 'week':
                dateRange = `Week ${moment(aDay, 'YYYY-MM-DD').week()}, ${moment(
                    aDay,
                    'YYYY-MM-DD',
                ).format('YYYY')}`;
                break;
            case 'month':
                dateRange = moment(aDay, 'YYYY-MM-DD').format('MMMM, YYYY');
                break;
            case 'year':
                dateRange = moment(aDay, 'YYYY-MM-DD').format('YYYY');
                break;
            default:
                break;
        }

        return dateRange;
    }

    convertDateRangeToISO8601(dateRange: dateRange) {
        return dateRange.map((item) => timeService.ddMMYYYYToISO8601(item));
    }

    convertDateRangeToDDMMYYY(dateRange: dateRange) {
        return dateRange.map((item) => timeService.iso8601ToDDMMYYY(item));
    }
}

const timeService = new TimeService();

export default timeService;
