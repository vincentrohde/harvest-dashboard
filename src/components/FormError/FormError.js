import React from 'react';
import { Message } from "semantic-ui-react";

const FormError = ({ error }) => {
    let errorContent;
    switch (error) {
        case 'hours':
            errorContent = 'Hours need to be in format (H)H:MM';
            break;
        default:
            errorContent = 'There is something wrong with your inputs';
    }
    return (
        <div className="FormError">
            { error && (
                <Message
                    error
                    header="Input Error"
                    content={errorContent}
                />
            )}
        </div>
    );
}

export default FormError;