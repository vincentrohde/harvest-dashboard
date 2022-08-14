import arrayService from './ArrayService';

describe('getUniqueValuesArray', () => {
    it('Returns a new array containing only the unique values', () => {
        const names = ['Vincent',  'Angela', 'Vincent', 'Cynthia'];
        const uniqueNames = ['Vincent',  'Angela', 'Cynthia'];

        expect(arrayService.getUniqueValuesArray(names)).toStrictEqual(uniqueNames);
    });
});
