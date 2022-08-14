import { renderHook } from '@testing-library/react-hooks'
import { usePresetDateRange } from './usePresetDateRange';
import {FiltersInterface} from '@/types/Filters';
import timeService from '@/services/TimeService/TimeService';

test('Returns 1 if preset is set to "all"', () => {
    renderHook(() => usePresetDateRange('all', (range: FiltersInterface['dateRange']) => {
        expect(range).toBe(1);
    }));
});

test('Returns an array with the current date as the value, if preset is set to "today"', () => {
    const currentDay = timeService.getCurrentDay();

    renderHook(() => usePresetDateRange('today', (range: FiltersInterface['dateRange']) => {
        expect(range).toStrictEqual([currentDay]);
    }));
});



describe('Returns correct date range for the selected preset', () => {
    test('Returns correct date range for "one-week" preset', () => {
        const currentDay = timeService.getCurrentDay();

        renderHook(() => usePresetDateRange('one-week',
            (range: FiltersInterface['dateRange']) => {
            expect(range).toStrictEqual([timeService.getDateFromDaysAgo(6), currentDay]);
        }));
    });

    test('Returns correct date range for "one-month" preset', () => {
        const currentDay = timeService.getCurrentDay();

        renderHook(() => usePresetDateRange('one-month',
            (range: FiltersInterface['dateRange']) => {
            expect(range).toStrictEqual([timeService.getDateFromDaysAgo(29), currentDay]);
        }));
    });

    test('Returns correct date range for "one-year" preset ', () => {
        const currentDay = timeService.getCurrentDay();

        renderHook(() => usePresetDateRange('one-year',
            (range: FiltersInterface['dateRange']) => {
            expect(range).toStrictEqual([timeService.getDateFromDaysAgo(364), currentDay]);
        }));
    });
});

test('Doesn\'t trigger callback functionality, if preset stays the same', () => {
    let preset = 'all';
    let count = 0;

    const presetCallback = (_range: FiltersInterface['dateRange']) => {
        count++;
    }

    const { rerender } = renderHook(() => usePresetDateRange(preset, presetCallback));
    preset = 'all';
    rerender();

    preset = 'all';
    rerender();

    // Expect count to be 1.
    // If the callback functionality would be triggered again, without the preset value changing,
    // the count would expected to be 3
    expect(count).toBe(1);
});
