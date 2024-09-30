import React from "react";

interface LoadingProps {
  center?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ center }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};
export default Loading;
