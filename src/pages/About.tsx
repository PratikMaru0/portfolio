import { useEffect, useState } from "react";
import { aboutTxt } from "../constants/texts";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const About = () => {
  const [introduction, setIntroduction] = useState<string>("");
  const [skills, setSkills] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/about`);
        const data = await res.data;
        setIntroduction(data.abouts[0].introduction || "");
        setSkills(data.abouts[0].skills || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[40vh] px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid mb-4"></div>
        <span className="text-primary text-lg font-medium">Loading...</span>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center w-full pt-6 pb-8 sm:pt-8 sm:pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      {/* Introduction Label */}
      <div className="text-center mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base tracking-wide text-themeText/60">
        {aboutTxt.introduction}
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 px-2">
        {aboutTxt.about}
      </h1>

      {/* Introduction Text */}
      <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-sm sm:text-base md:text-lg lg:text-xl text-themeText/80 mx-auto px-2 sm:px-4 leading-relaxed">
        {introduction}
      </div>

      {/* Skills Section */}
      <div className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <div className="w-full">
          {/* Skills Grid */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {skills.map((skill: any, idx: number) => (
              <div
                key={idx}
                className="relative group rounded-lg border border-themeText/20 p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 hover:border-primary/70 hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 bg-themeBackground/50"
              >
                <img
                  src={
                    skill.icon.includes("imagekit.io")
                      ? `${skill.icon}?tr=w-80,h-80,bg-FFFFFF00,fit-contain`
                      : skill.icon
                  }
                  alt={skill.skill + " icon"}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                />

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 px-2 py-1 text-xs sm:text-sm bg-primary text-themeText rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 shadow-lg">
                  {skill.skill}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
