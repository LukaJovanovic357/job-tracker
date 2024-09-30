import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import PageBtnContainer from "./PageBtnContainer";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import Job from "./Job";

const JobsContainer: React.FC = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store: RootState) => store.allJobs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {/* TODO add type for job*/}
        {jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
