import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-api.js';
class NotFoundError extends CustomAPIError {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export { NotFoundError };
//# sourceMappingURL=not-found.js.map