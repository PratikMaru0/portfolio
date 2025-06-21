import { testimonialsText } from "../constants/texts";
import { testimonials } from "../mockData";
import Card from "../components/common/Card";

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
            <Card key={idx} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
