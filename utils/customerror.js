// Custom error handler : pass helpful error message and status code for smother debugging process
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
module.exports = CustomError;