import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { testimonialsText } from "../constants/texts";
import Card from "../components/common/Card";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../utils/store/alertSlice";
import TestimonialsMoreInfo from "../components/dashboard/TestimonialsMoreInfo";

import { useRef } from "react";

const Testimonials = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/projects`);
        setProjects(res.data.data || []);
      } catch (err: any) {
        dispatch(
          addAlertMsg({ message: err.response.data.error, status: err.status })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full pt-8">
      <div className="text-center mb-2 text-sm tracking-wide opacity-70">
        {testimonialsText.heading}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
        {testimonialsText.subHeading}
      </h1>
      <div className="text-sm sm:text-base md:text-lg lg:text-xl text-center mb-10 opacity-80 mx-auto">
        {testimonialsText.introduction}
      </div>

      {/* Scroll container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex flex-nowrap md:justify-center gap-4 sm:gap-6 lg:gap-8 px-4 pb-2 w-max min-w-full">
          {projects.map((project, idx) => {
            return (
              <Card
                key={project._id || idx}
                testimonial={{
                  title: project.projectName,
                  link: `${project.imageUrl}`,
                  desc: project.description,
                  gitHubLink: project.gitHubLink,
                  liveLink: project.liveLink,
                }}
                onMoreInfo={() => {
                  setSelectedTestimonial(project);
                  setOpenModal(true);
                }}
              />
            );
          })}
        </div>
      </div>
      {openModal && selectedTestimonial && (
        <TestimonialsMoreInfo
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalRef={modalRef}
          data={selectedTestimonial}
        />
      )}
    </div>
  );
};

export default Testimonials;
