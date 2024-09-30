import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { StatsContainer, ChartsContainer } from "../../components";

const Stats: React.FC = () => {
  const { monthlyApplications } = useSelector(
    (state: RootState) => state.allJobs,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
