import { arrowIcon } from "../../assets";

interface CardProps {
  key: string | number;
  testimonial: {
    title: string;
    link: string;
  };
}
const Card = ({ testimonial, key }: CardProps) => {
  return (
    <div
      className="my-4 relative rounded-2xl overflow-hidden min-w-[320px] max-w-xs border border-border hover:border-primary/70 shadow-[0_0_5px_var(--tw-shadow-color)] shadow-themeText hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-primary transition-shadow duration-300 h-80"
      key={key}
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
        <div className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-primary border-2 border-primary hover:cursor-pointer">
          {/* Arrow icon */}
          <img src={arrowIcon} />
        </div>
      </div>
    </div>
  );
};

export default Card;
