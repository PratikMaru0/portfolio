import { useRouteError } from "react-router-dom";
import Header from "./Header";

const Error = () => {
  type ErrorResponse = {
    status: number;
    statusText: string;
  };

  const { status, statusText } = useRouteError() as ErrorResponse;

  return (
    <div className="min-h-screen bg-themeBackground text-themeText flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-xl p-10 flex flex-col items-center w-full max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-4">
            {status || 404}
          </h1>
          <h2 className="text-2xl text-themeText/80 mb-2">
            {statusText || "Not Found"}
          </h2>
          <p className="text-themeText/60">Oops! Something went wrong.</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
