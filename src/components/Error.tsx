import { useRouteError } from "react-router-dom";

const Error = () => {
  type ErrorResponse = {
    status: number;
    statusText: string;
  };

  const { status, statusText } = useRouteError() as ErrorResponse;

  return (
    <div>
      <h1>{status}</h1>
      <h1>{statusText}</h1>
      <h1>Oops! Something went wrong.</h1>
    </div>
  );
};

export default Error;
