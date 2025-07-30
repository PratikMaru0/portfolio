import { Video, Image } from "@imagekit/react";
import ActionButton from "./ActionButton";
import imageKit from "../dashboard/utils/imageKit";

interface CardProps {
  key: string | number;
  testimonial: {
    title: string;
    link: string;
    desc: string;
    gitHubLink?: string;
    liveLink?: string;
  };
  onMoreInfo?: () => void;
}

const Card = ({ testimonial, key, onMoreInfo }: CardProps) => {
  const { isVideo } = imageKit();

  return (
    <div
      className="my-2 sm:my-3 lg:my-4 relative rounded-lg overflow-hidden w-full 
                 min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[360px] 
                 max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg
                 border-2 border-border shadow-sm hover:border-primary/70 
                 flex flex-col hover:shadow-[0_0_10px_var(--tw-shadow-color)] 
                 hover:shadow-primary transition-shadow duration-300 
                 bg-primary/10 hover:bg-primary/20"
      key={key}
    >
      <div
        className="w-full h-40 sm:h-48 md:h-52 lg:h-56 bg-themeBackground cursor-pointer"
        onClick={() => {
          window.open(testimonial.link, "_blank");
        }}
      >
        {isVideo(testimonial.link) ? (
          <Video
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL}
            src={testimonial.link}
            className="w-full h-full object-cover rounded-md"
            controls
          />
        ) : (
          <Image
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL}
            src={testimonial.link}
            className="w-full h-full object-cover rounded-md"
            alt={testimonial.title}
          />
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h5 className="mb-2 text-md sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-themeText line-clamp-2">
            {testimonial.title}
          </h5>
          <p className="mb-3 font-normal text-xs sm:text-sm md:text-base lg:text-base text-themeText/70 line-clamp-3">
            {testimonial.desc.length > 120
              ? testimonial.desc.slice(0, 120) + "..."
              : testimonial.desc}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-start items-stretch sm:items-center">
          <ActionButton
            style="inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 
                   text-xs sm:text-sm md:text-sm font-medium text-center text-themeText 
                   bg-primary rounded-lg hover:bg-primary/60 bg-primary/50 
                   transition-colors duration-200 flex-1 sm:flex-none"
            onClick={onMoreInfo}
            text={"ℹ️ More details"}
          />

          {testimonial.gitHubLink && (
            <ActionButton
              style="inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 
                     text-xs sm:text-sm md:text-sm font-medium text-center text-themeText 
                     bg-primary rounded-lg hover:bg-primary/60 bg-primary/50 
                     transition-colors duration-200 flex-1 sm:flex-none"
              onClick={() => {
                window.open(testimonial.gitHubLink, "_blank");
              }}
              text={"🔗 GitHub"}
            />
          )}
          {testimonial.liveLink && (
            <ActionButton
              style="inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 
                     text-xs sm:text-sm md:text-sm font-medium text-center text-themeText 
                     bg-primary rounded-lg hover:bg-primary/60 bg-primary/50 
                     transition-colors duration-200 flex-1 sm:flex-none"
              onClick={() => {
                window.open(testimonial.liveLink, "_blank");
              }}
              text={"👁️ Live"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
