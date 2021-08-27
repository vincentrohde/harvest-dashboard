// Libs
import { useState, useEffect } from 'react';

// Hooks
import usePrevious from '@/hooks/utils/usePrevious/usePrevious';
import { useDebounce } from '@/hooks/utils/useDebounce/useDebounce';

// Services
import objectService from '@/services/ObjectService/ObjectService';

// Types
import { useErrorCheckProps } from './useErrorCheck.types'

// Regex
import { hoursInputRegex, dateInputRegex } from './useErrorCheck.regex';

export const useErrorCheck = ({ entry, lastInputChange }: useErrorCheckProps) => {
    const [errorList, setErrorList] = useState<string[]>([]);
    const debouncedEntry = useDebounce(entry, 2000);
    const prevDebouncedEntry = usePrevious(debouncedEntry);

    const removeErrorFromList = (inputName: string) => {
        const newErrorList = [...errorList];

        newErrorList.forEach((item, index) => {
            if (item === inputName) {
                newErrorList.splice(index, 1);
            }
        });

        setErrorList(newErrorList);
    };

    const userInputErrorHandler = (inputName: keyof typeof entry, regex: RegExp) => {
        const input = debouncedEntry[inputName];
        const isInputValid = input.toString().match(regex);

        if (isInputValid) {
            removeErrorFromList(inputName);
            return;
        }

        // @ts-ignore
        setErrorList([
            ...errorList,
            inputName
        ]);
    }

    const checkFormInput = () => {
        if (lastInputChange === 'hours') {
            userInputErrorHandler('hours', hoursInputRegex);
        }

        if (lastInputChange === 'spent_date') {
            userInputErrorHandler('spent_date', dateInputRegex);
        }
    }

    useEffect(() => {
        const isSameEntry = !objectService.isNewObjectDifferent(prevDebouncedEntry, debouncedEntry);
        if (isSameEntry) return;

        checkFormInput();
    }, [debouncedEntry]);

    return errorList;
}
