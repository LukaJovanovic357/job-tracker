import Wrapper from "../assets/wrappers/JobInfo";

interface JobInfoProps {
  icon: React.ReactNode;
  text: string;
}

const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
