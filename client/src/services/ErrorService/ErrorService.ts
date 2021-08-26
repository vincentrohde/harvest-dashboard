class ErrorService {
    handleBasicApiError (error: Error) {
        console.log(error);
    }
}

export const errorService = new ErrorService();