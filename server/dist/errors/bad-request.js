import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-api.js';
class BadRequestError extends CustomAPIError {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
export { BadRequestError };
//# sourceMappingURL=bad-request.js.map