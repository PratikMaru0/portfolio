import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./pages/Hero";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Quotes from "./components/Quotes";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./components/PageNotFound";

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
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
      ],
      errorElement: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Body;
