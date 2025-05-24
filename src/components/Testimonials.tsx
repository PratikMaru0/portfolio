import { arrowIcon } from "../assets";
import { testimonialsText } from "../constants/texts";
import { testimonials } from "../mockData";

const Testimonials = () => {
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
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="my-4 relative rounded-2xl overflow-hidden min-w-[320px] max-w-xs border border-border hover:border-primary/70 shadow-[0_0_5px_var(--tw-shadow-color)] shadow-themeText hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-primary transition-shadow duration-300 h-80"
            >
              <img
                src={testimonial.link}
                alt={testimonial.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute left-4 right-4 bottom-6 rounded-xl flex items-center px-6 py-4 shadow bg-themeBackground">
                <div className="flex-1">
                  <div className="font-semibold text-lg mb-1">{testimonial.title}</div>
                </div>
                <div className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-primary border-2 border-primary hover:cursor-pointer">
                  {/* Arrow icon */}
                  <img src={arrowIcon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
