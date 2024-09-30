import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ChartsContainer: React.FC = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector(
    (store: RootState) => store.allJobs,
  );
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
