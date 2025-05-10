import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Hero from "./Hero";
import Contact from "./Contact";

const Body = () => {
    const router = createBrowserRouter([
        {
            path:'/',
            children:[
                {
                    path:'/',
                    element: <Hero/>
                },
                {
                    path:'/contact',
                    element: <Contact/>
                }
            ],
            element: <Layout/>
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Body