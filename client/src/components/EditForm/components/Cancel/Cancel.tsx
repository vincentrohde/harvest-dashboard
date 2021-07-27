// Libs
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const Cancel = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <Button
            className="cancel-button js-cancel"
            width={5}
            size="medium"
            type="button"
            onClick={onCancel}
        >
            <Icon name="cancel" /> Cancel
        </Button>
    );
}

export default Cancel;
