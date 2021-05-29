import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CancelButton = ({ handleCancel }: { handleCancel: () => void }) => {
    return (
        <Button
            className="cancel-button js-cancel"
            width={5}
            size="medium"
            type="button"
            onClick={handleCancel}
        >
            <Icon name="undo" /> Cancel
        </Button>
    );
}

export default CancelButton;