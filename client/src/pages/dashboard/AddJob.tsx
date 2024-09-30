import React, { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";

const AddJob: React.FC = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    isEditing,
    editJobId,
    status,
    statusOptions,
  } = useSelector((state: RootState) => state.job);

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        }),
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: "jobLocation",
          value: user!.location,
        }),
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
