import { useState, useEffect } from 'react';
import { usePrevious } from '../usePrevious';

export const useIsNewStateDifferent = <T>(state: T) => {
    const [isNewStateDifferent, setIsNewStateDifferent] = useState(false);
    const prevState = usePrevious(state);

    useEffect(() => {
        const isFirstState = typeof prevState === 'undefined' && typeof state !== 'undefined';
        const isDifferentState = (typeof prevState !== 'undefined' && typeof state !== 'undefined') &&
            (JSON.stringify(prevState) !== JSON.stringify(state));

        setIsNewStateDifferent(isFirstState || isDifferentState);
    }, [state]);

    return isNewStateDifferent;
}