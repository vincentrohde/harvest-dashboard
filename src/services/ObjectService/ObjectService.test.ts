import objectService from './ObjectService';

describe('isEmptyObject', () => {
    it('Returns true, if the object is empty', () => {
        expect(objectService.isEmptyObject({})).toBe(true);
    });

    it('Returns false, if the object is not empty', () => {
        expect(objectService.isEmptyObject({
            name: 'Vincent'
        })).toBe(false);
    });
});

describe('sortObjectsArray', () => {
    const list = [{ apples: 6 }, { apples: 4 }, { apples: 8 }];

    it('Returns the array sorted descending, by the given selector', () => {
        expect(objectService.sortObjectsArray(true, list, 'apples'))
            .toStrictEqual([{ apples: 8 }, { apples: 6 }, { apples: 4 }]);
    });

    it('Returns the array sorted ascending, by the given selector', () => {
        expect(objectService.sortObjectsArray(false, list, 'apples'))
            .toStrictEqual([{ apples: 4 }, { apples: 6 }, { apples: 8 }]);
    });
});

describe('isNewObjectDifferent', () => {
    it('Returns false, if the new object is equal to the old object', () => {
        expect(objectService.isNewObjectDifferent({ name: 'Vincent' }, { name: 'Vincent' }))
            .toBe(false);
    });

    it('Returns the new object, if it is different from the old object', () => {
        expect(objectService.isNewObjectDifferent({ name: 'Vincent' }, { name: 'Tommy' }))
            .toStrictEqual({ name: 'Tommy' });
    });
});
