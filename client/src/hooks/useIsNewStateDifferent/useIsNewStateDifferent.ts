import { useEffect } from 'react';
import { usePrevious } from '../usePrevious';

export const useIsNewStateDifferent = <T>(state: T, callback: Function) => {
    const prevState = usePrevious(state);

    useEffect(() => {
        if ((typeof prevState === 'undefined' && typeof state !== 'undefined') ||
            ((typeof prevState !== 'undefined' && typeof state !== 'undefined') &&
                (JSON.stringify(prevState) !== JSON.stringify(state)))) {
            callback();
        }
    });
}
