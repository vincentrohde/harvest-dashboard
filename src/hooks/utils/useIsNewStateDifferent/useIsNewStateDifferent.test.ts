import { renderHook } from '@testing-library/react-hooks'
import useIsNewStateDifferent from './useIsNewStateDifferent';

test('Returns true if new state is different from old state', () => {
    let state = { name: 'John Smith' };

    const { result, rerender } = renderHook(() => useIsNewStateDifferent(state))

    state = { name: 'John Apple' };
    rerender();

    expect(result.current).toBe(true)
});

test('Returns false if new state is not different from old state', () => {
    let state = { name: 'John Smith' };

    const { result, rerender } = renderHook(() => useIsNewStateDifferent(state))

    state = { name: 'John Smith' };
    rerender();

    expect(result.current).toBe(false);
});

test('Returns true if there is no previous state', () => {
    let state = { name: 'John Smith' };

    const { result } = renderHook(() => useIsNewStateDifferent(state))

    expect(result.current).toBe(true)
});
