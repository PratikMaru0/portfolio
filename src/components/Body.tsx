import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Hero from "./Hero";
import Contact from "./Contact";
import Error from "./Error";
import About from "./About";

const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <Hero />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
      element: <Layout />,
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Body;
