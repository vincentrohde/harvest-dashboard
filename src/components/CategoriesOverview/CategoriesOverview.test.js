import CategoriesOverview from './CategoriesOverview';
import { shallow } from 'enzyme';
import React from 'react';

const wrapper = shallow(<CategoriesOverview />);
const instance = wrapper.instance();

describe('[CategoriesOverview] prepareDataForChart', () => {
    const protoEntry = {
        category: 'Frontend',
        hours: 0.61
    };

    const protoList = [{category: 'Backend', hours: 0.3}, {...protoEntry}];

    test('categories and hours are separated as arrays and in descending order', () => {
        expect(instance.prepareDataForChart(protoList)).toEqual(expect.objectContaining({
            categories: ['Frontend', 'Backend'],
            hours: [0.61, 0.3]
        }));
    });
});

describe('[CategoriesOverview] isCategoryListChange', () => {
    const protoList = [{ category: 'Frontend', hours: 0.5}];
    const longerList = [...protoList, {category: 'Backend', hours: 2.5}];

    test('if the previous list is null, the change should be true', () => {
        expect(instance.isCategoryListChange(null)).toEqual(true);
    });

    test('if the next list is longer, than the previous list, the change should be true', () => {
        expect(instance.isCategoryListChange(
            [...protoList],
            [...longerList])).toEqual(true);
    });

    test('if the next list is shorter, than the previous list, the change should be true', () => {
        expect(instance.isCategoryListChange(
            [...longerList],
            [...protoList])).toEqual(true);
    });
});

describe('[CategoriesOverview] isPropsHoursDifference', () => {
    const propObject = {
        category: 'math',
        hours: 0.5
    };

    test('missing next props parameter means no hours difference for previous props', () => {
        const prevProps = [{...propObject}];

        expect(instance.isPropsHoursDifference(prevProps)).toEqual(false);
    });

    test('same hours mean no hours difference for props', () => {
        const prevProps = [{...propObject}];
        const nextProps = [{...propObject}];

        expect(instance.isPropsHoursDifference(prevProps, nextProps)).toEqual(false);
    });

    test('even if only a single item has a difference, the entire props lists are different', () => {
        const prevProps = [{...propObject}, {...propObject, category: 'spanish'}];
        const nextProps = [{...propObject}, { category: 'spanish', hours: 16 }];

        expect(instance.isPropsHoursDifference(prevProps, nextProps)).toEqual(true);
    });

    test('the hours difference only occurs if the whole number of hours property changes', () => {
        const prevProps = [{...propObject, hours: 1.1}];
        const nextProps = [{...propObject, hours: 1.2}];

        expect(instance.isPropsHoursDifference(prevProps, nextProps)).toEqual(false);
    });
});

describe('[CategoriesOverview] getHoursByTwoDecimals', () => {
    test('method returns hours by two decimals in an array', () => {
        const params = [
            {
                hours: 1.4777467,
                tag: 'sports'
            },
            {
                hours: '3.451'
            }
        ];

        expect(instance.getHoursByTwoDecimals(params)).toEqual([1.48, 3.45]);
    });
});

describe('[CategoriesOverview] getCategoriesFromEntries', () => {
    test('method returns the categories from entries in an array', () => {
        const params = [
            {
                category: 'peach',
                name: 'Fanta'
            },
            {
                category: 'apple',
                name: 'Juice'
            }
        ];

        expect(instance.getCategoriesFromEntries(params)).toEqual(['peach', 'apple']);
    });
});