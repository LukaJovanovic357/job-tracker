export interface ErrorResponse {
  msg?: string;
}

export interface JobState {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
}

export interface Job {
  _id: string;
  createdAt: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
}

export interface JobInput {
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
}

export interface FiltersState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

export interface Stats {
  pending?: number;
  interview?: number;
  declined?: number;
}

export interface MonthlyApplication {
  date: string;
  count: number;
}

export interface ShowStatsResponse {
  defaultStats: Stats;
  monthlyApplications: MonthlyApplication[];
}

export interface GetAllJobsResponse {
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
}

export interface ShowStatsResponse {
  defaultStats: Stats;
  monthlyApplications: MonthlyApplication[];
}

export interface AllJobsState extends FiltersState {
  isLoading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Stats;
  monthlyApplications: any[];
}

export interface User {
  id?: string | number;
  email?: string;
  lastName?: string | undefined;
  location?: string | undefined;
  name?: string | undefined;
  password?: string;
  token?: string | undefined;
}

export interface LoginResponse {
  user: {
    email: string;
    lastName: string;
    location: string;
    name: string;
    token: string;
  };
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdateInfo {
  name: string;
  email: string;
  lastName: string;
  location: string;
}

export interface AuthPayload {
  user: User;
}

export interface UserUpdateData {
  name: string;
  email: string;
  lastName: string;
  location: string;
}

export interface UserCredentials {
  name?: string;
  email?: string;
  password?: string;
}
