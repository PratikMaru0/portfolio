import { aboutTxt } from "../constants/texts";
import { skills } from "../mockData";

const About = () => {
  return (
    <div className="flex flex-col items-center w-full pt-8">
      <div className="text-center mb-2 text-sm tracking-wide opacity-70">
        {aboutTxt.introduction}
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">{aboutTxt.about}</h1>
      <div className="max-w-2xl text-center mb-8 text-base opacity-80 mx-auto">
        {aboutTxt.intro}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-4xl mb-8">
        <div className="w-10/12 md:w-3/4 flex-1 flex flex-col items-center md:items-start">
          <div className="w-full">
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill: object, idx: number) => (
                <div
                  key={idx}
                  className="relative group rounded-lg border p-4 flex flex-col items-center justify-center w-18 h-18 hover:border-primary/70 hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-primary transition-shadow duration-300 m-2 border-gray-800 bg-gray-900"
                >
                  <img
                    src={(skill as { icon: string }).icon}
                    alt="skill icon"
                  />
                  <div className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-primary/70 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {(skill as { label: string }).label}
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
