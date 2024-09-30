import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-api.js';
class UnauthenticatedError extends CustomAPIError {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
export { UnauthenticatedError };
//# sourceMappingURL=unauthenticated.js.map