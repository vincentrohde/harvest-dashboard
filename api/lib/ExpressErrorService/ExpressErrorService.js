// Service for handling of Express.js errors

class ExpressErrorService {
    sendReadOnlyErrorResponse (res) {
        const response = {
            status: 405,
            statusText: 'Application mode is read-only'
        }

        this.sendErrorResponse({
            response
        }, res);
    };

    sendErrorResponse (error, res) {
        const { status: errorStatus, statusText: errorMessage } = error.response;
        res.status(errorStatus).send({
            message: errorMessage,
        });
    }
}

module.exports = new ExpressErrorService();
