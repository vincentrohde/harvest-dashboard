// Libs
import React from 'react';
import { Message } from "semantic-ui-react";

// Types
import { ErrorProps } from './Error.props';

// Styling
import './Error.scss';

const Error = ({ error }: ErrorProps) => {
    let errorContent: string;
    switch (error[0]) {
        case 'hours':
            errorContent = 'Hours need to be in format (H)H:MM';
            break;
        case 'spent_date':
            errorContent = 'Date needs to be in format DD.MM.YYYY';
            break;
        default:
            errorContent = 'There is something wrong with your inputs';
    }
    return (
        <div className="Error">
            { error && (
                <Message
                    error
                    header="Input Error"
                    content={ errorContent }
                />
            )}
        </div>
    );
}

export default Error;
