import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Testimonials from "./Testimonials";
import Home from "./Home";

const MainPage = () => {
  const components = [
    { id: "home", component: <Home /> },
    { id: "about", component: <About /> },
    { id: "services", component: <Services /> },
    { id: "testimonials", component: <Testimonials /> },
    { id: "contact", component: <Contact /> },
  ];
  return (
    <div>
      {components.map(({ id, component }) => {
        return (
          <div key={id} id={id} className="scroll-mt-20">
            {component}
          </div>
        );
      })}
    </div>
  );
};

export default MainPage;
