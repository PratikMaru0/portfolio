import { useRouteError } from "react-router-dom";

const Error = () => {
  type ErrorResponse = {
    status: number;
    statusText: string;
  };

  const { status, statusText } = useRouteError() as ErrorResponse;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-themeBackground text-themeText">
      <h1 className="text-6xl font-bold text-primary mb-4">{status}</h1>
      <h2 className="text-2xl text-themeText/80 mb-2">{statusText}</h2>
      <p className="text-themeText/60">Oops! Something went wrong.</p>
    </div>
  );
};

export default Error;
