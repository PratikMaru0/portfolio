import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Hero from "./Hero";
import Contact from "./Contact";
import Error from "./Error";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Quotes from "./Quotes";
import Admin from "./Admin";

const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/testimonials",
          element: <Testimonials />,
        },
        {
          path: "/quotes",
          element: <Quotes />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Body;
