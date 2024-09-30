import { describe, it, expect, vi, beforeEach } from 'vitest';
import customFetch, {
    checkForUnauthorizedResponse
} from '../../../utils/axios';
import { showLoading, getAllJobs } from '../../allJobs/allJobsSlice';
import { clearValues } from '../jobSlice';
import { deleteJobThunk, createJobThunk, editJobThunk } from '../jobThunk';
import { JobInput } from '../../../types';

vi.mock('../../../utils/axios', () => ({
    default: {
        delete: vi.fn(),
        post: vi.fn(),
        patch: vi.fn()
    },
    checkForUnauthorizedResponse: vi.fn()
}));

vi.mock('../../allJobs/allJobsSlice', () => ({
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    getAllJobs: vi.fn()
}));

vi.mock('../jobSlice', () => ({
    clearValues: vi.fn()
}));

vi.mock('../../user/userSlice', () => ({
    logoutUser: vi.fn()
}));

describe('jobThunks', () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();
    const mockRejectWithValue = vi.fn();

    const thunkAPI = {
        dispatch: mockDispatch,
        getState: mockGetState,
        rejectWithValue: mockRejectWithValue
    } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('deleteJobThunk', () => {
        it('should handle successful job deletion', async () => {
            const mockResponse = { data: { msg: 'Job deleted successfully' } };
            (customFetch.delete as any).mockResolvedValue(mockResponse);

            const result = await deleteJobThunk('jobId123', thunkAPI);

            expect(result).toBe(mockResponse.data.msg);
            expect(mockDispatch).toHaveBeenCalledWith(showLoading());
            expect(customFetch.delete).toHaveBeenCalledWith('/jobs/jobId123');
            expect(mockDispatch).toHaveBeenCalledWith(getAllJobs());
        });
    });

    describe('createJobThunk', () => {
        it('should handle successful job creation', async () => {
            const mockResponse = {
                data: { job: { id: '1', position: 'New Job' } }
            };
            (customFetch.post as any).mockResolvedValue(mockResponse);

            const jobInput: JobInput = {
                position: 'New Job',
                company: 'Company',
                jobLocation: 'Remote',
                jobType: 'Full-time',
                status: 'Interview'
            };

            const result = await createJobThunk(jobInput, thunkAPI);

            expect(result).toEqual(mockResponse.data);
            expect(customFetch.post).toHaveBeenCalledWith('/jobs', jobInput);
            expect(mockDispatch).toHaveBeenCalledWith(clearValues());
        });
    });

    describe('editJobThunk', () => {
        it('should handle successful job editing', async () => {
            const mockResponse = {
                data: { job: { id: '1', position: 'Edited Job' } }
            };
            (customFetch.patch as any).mockResolvedValue(mockResponse);

            const jobInput: JobInput = {
                position: 'Edited Job',
                company: 'Company',
                jobLocation: 'Remote',
                jobType: 'Full-time',
                status: 'Interview'
            };

            const result = await editJobThunk(
                { jobId: 'jobId123', job: jobInput },
                thunkAPI
            );

            expect(result).toEqual(mockResponse.data);
            expect(customFetch.patch).toHaveBeenCalledWith(
                '/jobs/jobId123',
                jobInput
            );
            expect(mockDispatch).toHaveBeenCalledWith(clearValues());
        });

        it('should handle job editing failure due to unauthorized response', async () => {
            const mockError = {
                response: { status: 401, data: { msg: 'Unauthorized' } }
            };
            (customFetch.patch as any).mockRejectedValue(mockError);

            const jobInput: JobInput = {
                position: 'Edited Job',
                company: 'Company',
                jobLocation: 'Remote',
                jobType: 'Full-time',
                status: 'Interview'
            };

            await editJobThunk({ jobId: 'jobId123', job: jobInput }, thunkAPI);

            expect(checkForUnauthorizedResponse).toHaveBeenCalledWith(
                mockError,
                thunkAPI
            );
        });
    });
});
