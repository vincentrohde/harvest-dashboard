// Libs
import { useState, useEffect } from 'react';
import _ from 'underscore';

// Hooks
import { usePrevious } from '../../../hooks/usePrevious';

// Services
import { objectService } from '../../../lib/ObjectService/ObjectService';

// Types
import { useErrorCheckProps } from './useErrorCheck.props'

// Regex
import { hoursInputRegex, dateInputRegex } from './useErrorCheck.regex';

export const useErrorCheck = ({ entry, lastInputChange }: useErrorCheckProps) => {
    const [errorList, setErrorList] = useState([]);
    const prevEntry = usePrevious({ entry });

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
        const input = entry[inputName];
        const isInputValid = input.toString().match(regex.toString());

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

    const debouncedCheckFormInput = _.debounce(checkFormInput, 2000);

    useEffect(() => {
        const isSameEntry = !objectService.isNewObjectDifferent(prevEntry, entry);
        if (isSameEntry) return;

        debouncedCheckFormInput();
    });

    return errorList;
}
