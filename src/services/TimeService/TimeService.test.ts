import timeService from './TimeService';

describe('hoursToMinutes', () => {
    it('Converts 1h to 60min', () => {
        expect(timeService.hoursToMinutes(1)).toBe(60);
    });
    it('Converts 1.5h to 90min', () => {
        expect(timeService.hoursToMinutes(1.5)).toBe(90);
    });
    it('Converts 0h to 0min', () => {
        expect(timeService.hoursToMinutes(0)).toBe(0);
    });
    it('Converts 0.333h to 20min', () => {
        expect(timeService.hoursToMinutes(0.333)).toBe(20);
    });
});

describe('minutesToHoursAndMinutes', () => {
    it('Converts 1min to 0:01', () => {
        expect(timeService.minutesToHoursAndMinutes(1)).toBe('0:01');
    });

    it('Converts 0.5min to 0:01', () => {
        expect(timeService.minutesToHoursAndMinutes(0.5)).toBe('0:01');
    });

    it('Converts 60min to 1:00', () => {
        expect(timeService.minutesToHoursAndMinutes(60)).toBe('1:00');
    });

    it('Converts 90min to 1:30', () => {
        expect(timeService.minutesToHoursAndMinutes(90)).toBe('1:30');
    });

    it('Converts 27min to 0:27', () => {
        expect(timeService.minutesToHoursAndMinutes(27)).toBe('0:27');
    });
});

describe('hoursToHoursAndMinutes', () => {
    it('Converts 1h to 1:00', () => {
        expect(timeService.hoursToHoursAndMinutes(1)).toBe('1:00');
    });

    it('Converts 1.5h to 1:30', () => {
        expect(timeService.hoursToHoursAndMinutes(1.5)).toBe('1:30');
    });

    it('Converts 0h to 0:00', () => {
        expect(timeService.hoursToHoursAndMinutes(0)).toBe('0:00');
    });
});
