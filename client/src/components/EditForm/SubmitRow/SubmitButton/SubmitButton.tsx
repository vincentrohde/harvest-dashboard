import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SubmitButton = ({ disabled }: { disabled: boolean; }) => {
    return (
        <Button
            className="submit-button js-submit"
            width={5}
            size="medium"
            primary
            disabled={disabled}
        >
            <Icon name="send" /> Submit
        </Button>
    );
}

export default SubmitButton;