import { describe, it, expect, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import { errorHandlerMiddleware } from '../error-handler.js';
// Mock Express request, response, and next function
const mockRequest = () => ({});
const mockResponse = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};
const mockNext = () => ({});
describe('errorHandlerMiddleware', () => {
    it('should handle a generic error', () => {
        const err = new Error('An unknown error occurred');
        err.statusCode = undefined;
        err.message = 'An unknown error occurred';
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();
        errorHandlerMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'An unknown error occurred',
        });
    });
    it('should handle duplicate key error (code 11000)', () => {
        const err = new Error('Duplicate key error');
        err.code = 11000;
        err.keyValue = { email: 'test@example.com' };
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();
        errorHandlerMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Duplicate value entered for email field, please choose another value',
        });
    });
    it('should handle validation errors', () => {
        const err = new Error('Validation error');
        err.name = 'ValidationError';
        err.errors = {
            name: { message: 'Name is required' },
            email: { message: 'Email is invalid' },
        };
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();
        errorHandlerMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'Name is required, Email is invalid',
        });
    });
    it('should handle CastError', () => {
        const err = new Error('Cast error');
        err.name = 'CastError';
        err.value = '12345';
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();
        errorHandlerMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            msg: 'No item found with ID: 12345',
        });
    });
});
//# sourceMappingURL=error-handler.test.js.map