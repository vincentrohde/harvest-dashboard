import moment from 'moment';

class TimeService {
    hoursToHoursAndMinutes (hours) {
        const totalMinutes = hours * 60;

        const convertedHours = Math.floor(totalMinutes / 60);
        let convertedMinutes = Math.floor(totalMinutes % 60);

        if (convertedMinutes.toString().length == 1) {
            convertedMinutes = '0' + convertedMinutes;
        }

        return `${convertedHours}:${convertedMinutes}`;
    }

    hoursAndMinutesToHours (time) {
        time = time.toString();
        const timeComponents = time.split(':');
        const dec = parseInt((timeComponents[1]/6)*10, 10);

        const hours = parseFloat(parseInt(timeComponents[0], 10) + '.' + (dec<10?'0':'') + dec);

        return Number(hours);
    }

    iso8601ToDDMMYYY (date) {
        const isDDMMYYYY = moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY') === date;

        if (isDDMMYYYY) {
            return date;
        }

        return moment(date).format('DD.MM.YYYY');
    }

    ddMMYYYYToISO8601 (date) {
        const isISO8601 = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;

        if (isISO8601) {
            return date;
        }

        return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
    }
}

export const timeService = new TimeService();