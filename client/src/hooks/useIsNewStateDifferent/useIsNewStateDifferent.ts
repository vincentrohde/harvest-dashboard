import { useState, useEffect } from 'react';
import { usePrevious } from '../usePrevious';

export const useIsNewStateDifferent = <T>(state: T) => {
    const [isNewStateDifferent, setIsNewStateDifferent] = useState(false);
    const prevState = usePrevious(state);

    useEffect(() => {
        let isDifferent = false;

        if ((typeof prevState === 'undefined' && typeof state !== 'undefined') ||
            ((typeof prevState !== 'undefined' && typeof state !== 'undefined') &&
                (JSON.stringify(prevState) !== JSON.stringify(state)))) {
            isDifferent = true;
        }

        setIsNewStateDifferent(isDifferent);
    }, [state]);

    return isNewStateDifferent;
}
