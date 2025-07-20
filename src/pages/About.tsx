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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full pt-8">
      <div className="text-center mb-2 text-sm tracking-wide opacity-70">
        {aboutTxt.introduction}
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">{aboutTxt.about}</h1>
      <div className="max-w-2xl text-center mb-8 text-base opacity-80 mx-auto">
        {introduction}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-4xl mb-8">
        <div className="w-10/12 md:w-3/4 flex-1 flex flex-col items-center md:items-start">
          <div className="w-full">
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill: any, idx: number) => (
                <div
                  key={idx}
                  className="relative group rounded-lg border p-2 flex flex-col items-center justify-center w-20 h-20 hover:border-primary/70 hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-primary transition-shadow duration-300 m-2"
                >
                  <img
                    src={
                      skill.icon.includes("imagekit.io")
                        ? `${skill.icon}?tr=w-80,h-80,bg-FFFFFF00,fit-contain`
                        : skill.icon
                    }
                    alt={skill.skill + " icon"}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-primary/70 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
