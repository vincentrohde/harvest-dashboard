require('dotenv').config();

const expressErrorService = require('../ExpressErrorService/ExpressErrorService');

const READ_ONLY = process.env.READ_ONLY;

class PermissionService {
    handleDataUpdate(success, res) {
        if (READ_ONLY) {
            expressErrorService.sendReadOnlyErrorResponse(res);
        } else {
            success();
        }
    };
}

module.exports = new PermissionService();
