import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { testimonialsText } from "../constants/texts";
import Card from "../components/common/Card";

const Testimonials = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/projects`);
        setProjects(res.data.data || []);
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full pt-8">
      <div className="text-center mb-2 text-sm tracking-wide opacity-70">
        {testimonialsText.heading}
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">
        {testimonialsText.subHeading}
      </h1>
      <div className="max-w-2xl text-center mb-10 text-base opacity-80 mx-auto">
        {testimonialsText.introduction}
      </div>

      {/* Scroll container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex flex-nowrap md:justify-center gap-6 px-4 pb-2 w-max min-w-full">
          {projects.map((project, idx) => (
            <Card
              key={project._id || idx}
              testimonial={{
                title: project.projectName,
                link: project.imageUrl,
                desc: project.description,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
