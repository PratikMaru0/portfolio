import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./pages/Hero";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./components/PageNotFound";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "./utils/store/adminSlice";
import { useEffect } from "react";
import Verification from "./components/VerifyAccount";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import { commonTxt } from "./constants/texts";
import ServicesEdit from "./components/dashboard/ServicesEdit";
import AboutEdit from "./components/dashboard/AboutEdit";
import TestimonialsEdit from "./components/dashboard/TestimonialsEdit";
import HomeEdit from "./components/dashboard/HomeEdit";
const Body = () => {
  const dispatch = useDispatch();
  const admin = useSelector((store: { admin: any }) => store.admin);

  useEffect(() => {
    document.title = commonTxt.title;
  }, []);

  const fetchAdmin = async () => {
    try {
      const admin = await axios.get(BASE_URL + "/adminDetails", {
        withCredentials: true,
      });
      dispatch(addAdmin(admin.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!admin) {
      fetchAdmin();
    }
  }, []);

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
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "home/edit",
              element: <HomeEdit />,
            },
            {
              path: "services/edit",
              element: <ServicesEdit />,
            },
            {
              path: "about/edit",
              element: <AboutEdit />,
            },
            {
              path: "testimonials/edit",
              element: <TestimonialsEdit />,
            },
          ],
        },
        {
          path: "/admin/verify",
          element: <Verification />,
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "/resetPassword/:token",
          element: <ResetPassword />,
        },
        {
          path: "/updatePassword",
          element: <UpdatePassword />,
        },
      ],
      errorElement: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Body;
