// Service for handling of Express.js errors

class ExpressErrorService {
    sendErrorResponse(error, res) {
        const {status: errorStatus, statusText: errorMessage} = error.response;
        res.status(errorStatus).send({
            message: errorMessage,
        });
    }
}

module.exports = new ExpressErrorService();
