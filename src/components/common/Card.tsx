interface CardProps {
  key: string | number;
  testimonial: {
    title: string;
    link: string;
    desc: string;
  };
}
import Button from "./Button";

const Card = ({ testimonial, key }: CardProps) => {
  return (
    <div
      className="my-4 relative rounded-lg overflow-hidden min-w-[320px] max-w-sm  border-2 border-border shadow-sm hover:border-primary/70 flex flex-col hover:shadow-[0_0_10px_var(--tw-shadow-color)] hover:shadow-primary transition-shadow duration-300"
      key={key}
    >
      <img
        className="rounded-t-lg w-full h-44 object-cover"
        src={testimonial.link}
        alt={testimonial.title}
      />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-themeText">
            {testimonial.title}
          </h5>
          <p className="mb-3 font-normal text-themeText/70">
            {testimonial.desc}
          </p>
        </div>
        <Button
          style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-primary/30"
          onClick={() => {}}
          text={"Read more"}
        />
      </div>
    </div>
  );
};

export default Card;
