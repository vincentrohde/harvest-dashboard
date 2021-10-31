// Code by Gabe Ragland (https://dev.to/gabe_ragland)
// Source: https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
// (c) 17th January, 2019

// Libs
import {useState, useEffect} from 'react';

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
