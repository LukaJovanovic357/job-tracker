import { describe, it, expect, vi } from 'vitest';
import { BadRequestError } from '../../errors/index.js';
import { testUser } from '../index';
// Mock BadRequestError to simulate real behavior
vi.mock('../../errors/index.js', () => ({
    BadRequestError: class extends Error {
        statusCode;
        constructor(message) {
            super(message);
            this.name = 'BadRequestError';
            this.statusCode = 400;
        }
    },
}));
// Mock request, response, and next function
const mockRequest = (user) => ({
    user,
});
const mockResponse = () => ({});
const mockNext = () => vi.fn();
describe('testUser Middleware', () => {
    it('should throw BadRequestError if req.user.testUser is true', () => {
        const req = mockRequest({ testUser: true });
        const res = mockResponse();
        const next = mockNext();
        // Check if the error is thrown and verify its properties
        try {
            testUser(req, res, next);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error).toHaveProperty('message', 'Test User. Read Only');
            expect(error).toHaveProperty('statusCode', 400);
        }
    });
    it('should call next() if req.user.testUser is false', () => {
        const req = mockRequest({ testUser: false });
        const res = mockResponse();
        const next = mockNext();
        testUser(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
//# sourceMappingURL=testUser.test.js.map