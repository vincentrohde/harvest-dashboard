import { renderHook } from '@testing-library/react-hooks'
import { useErrorCheck } from './useErrorCheck';

const entry = {
    notes: 'Test Entry',
    spent_date: '21.03.2022',
    hours: '1:00',
    project_id: 1,
    task_id: 1
};

describe('Returns an empty array if the user input is correct', () => {
    test('Returns an empty array for a correct "spent_date" input', () => {
        const lastInputChange = 'spent_date';

        const { result } = renderHook(() => useErrorCheck({
            entry, lastInputChange
        }));

        expect(result.current.length).toBe(0)
    });

    test('Returns an empty array for a correct "hours" input', () => {
        const lastInputChange = 'hours';

        const { result } = renderHook(() => useErrorCheck({
            entry, lastInputChange
        }));

        expect(result.current.length).toBe(0)
    });
});

describe('Returns an array containing a string value, of the input field name, where the input is not correct', () => {
    test('Returns an array containing a "spent_date" string', () => {
        const lastInputChange = 'spent_date';

        const { result } = renderHook(() => useErrorCheck({
            entry: {
                ...entry,
                spent_date: '2.03.202',
            }, lastInputChange
        }));

        expect(result.current).toStrictEqual(['spent_date']);
    });

    test('Returns an array containing an "hours" string', () => {
        const lastInputChange = 'hours';

        const { result } = renderHook(() => useErrorCheck({
            entry: {
                ...entry,
                hours: 2
            }, lastInputChange
        }));

        expect(result.current).toStrictEqual(['hours']);
    });
});
