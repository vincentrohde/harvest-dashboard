import moment from 'moment';

function iso8601ToDDMMYYY (date) {
    const isDDMMYYYY = moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY') === date;

    if (isDDMMYYYY) {
        return date;
    }

    return moment(date).format('DD.MM.YYYY');
};

function ddMMYYYYToISO8601 (date) {
    const isISO8601 = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;

    if (isISO8601) {
        return date;
    }

    return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
};

export {
    iso8601ToDDMMYYY,
    ddMMYYYYToISO8601
};