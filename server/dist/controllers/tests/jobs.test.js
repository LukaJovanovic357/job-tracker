import request from 'supertest';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import Job from '../../models/Job';
import 'dotenv/config';
vi.mock('../../models/Job');
describe('GET /api/v1/jobs', () => {
    let token;
    beforeEach(() => {
        token = jwt.sign({ userId: 'validUserId' }, process.env.SECRET_KEY);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('should return filtered jobs based on query parameters', async () => {
        const mockJobs = [{ position: 'Developer', createdBy: 'validUserId' }];
        Job.find.mockReturnValue({
            skip: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue(mockJobs),
        });
        Job.countDocuments.mockResolvedValue(mockJobs.length);
        const res = await request(app)
            .get('/api/v1/jobs?search=Developer')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.jobs).toHaveLength(mockJobs.length);
        expect(res.body.jobs[0].position).toEqual('Developer');
    });
    it('should return sorted jobs based on query parameters', async () => {
        const mockJobs = [
            { position: 'Designer', createdBy: 'validUserId' },
            { position: 'Developer', createdBy: 'validUserId' },
        ];
        Job.find.mockReturnValue({
            sort: vi.fn().mockReturnThis(),
            skip: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue(mockJobs),
        });
        Job.countDocuments.mockResolvedValue(mockJobs.length);
        const res = await request(app)
            .get('/api/v1/jobs?sort=a-z')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.jobs).toHaveLength(mockJobs.length);
        expect(res.body.jobs[0].position).toEqual('Designer');
        expect(res.body.jobs[1].position).toEqual('Developer');
    });
    it('should return paginated jobs based on query parameters', async () => {
        const mockJobs = Array.from({ length: 10 }, (_, i) => ({
            position: `Job${i + 1}`,
            createdBy: 'validUserId',
        }));
        Job.find.mockReturnValue({
            skip: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue(mockJobs),
        });
        Job.countDocuments.mockResolvedValue(20);
        const res = await request(app)
            .get('/api/v1/jobs?page=2&limit=10')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.jobs).toHaveLength(10);
        expect(res.body.totalJobs).toEqual(20);
        expect(res.body.numOfPages).toEqual(2);
    });
    it('should delete a job for the authenticated user', async () => {
        const mockJobId = 'validJobId';
        Job.findByIdAndDelete.mockResolvedValue({
            _id: mockJobId,
            createdBy: 'validUserId',
        });
        const res = await request(app)
            .delete(`/api/v1/jobs/${mockJobId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should return 404 if the job does not exist', async () => {
        const mockJobId = 'nonExistentJobId';
        Job.findByIdAndDelete.mockResolvedValue(null);
        const res = await request(app)
            .delete(`/api/v1/jobs/${mockJobId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
    });
});
//# sourceMappingURL=jobs.test.js.map