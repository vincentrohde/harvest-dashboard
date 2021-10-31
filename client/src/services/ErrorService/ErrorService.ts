class ErrorService {
    handleBasicApiError(error: Error) {
        console.log(error);
    }
}

const errorService = new ErrorService();

export default errorService;
