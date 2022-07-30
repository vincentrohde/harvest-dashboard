import objectService from './ObjectService';

describe('isEmptyObject', () => {
    it('{} is empty', () => {
        expect(objectService.isEmptyObject({})).toBe(true);
    });

    it('{ ... } is not empty {}', () => {
        expect(objectService.isEmptyObject({
            name: 'Vincent'
        })).toBe(false);
    });

    it('[] is not empty {}', () => {
        expect(objectService.isEmptyObject([])).toBe(false);
    });

    it('string is not empty {}', () => {
        expect(objectService.isEmptyObject('Vincent')).toBe(false);
    });

    it('number is not empty {}', () => {
        expect(objectService.isEmptyObject(9)).toBe(false);
    });

    it('boolean is not empty {}', () => {
        expect(objectService.isEmptyObject(true)).toBe(false);
    });
});
