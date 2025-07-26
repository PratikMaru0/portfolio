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
      className="my-4 relative rounded-lg overflow-hidden w-full sm:w-[350px] min-w-[90vw] sm:min-w-[320px] max-w-sm border-2 border-border shadow-sm hover:border-primary/70 flex flex-col hover:shadow-[0_0_10px_var(--tw-shadow-color)] hover:shadow-primary transition-shadow duration-300 bg-primary/10 hover:bg-primary/20"
      key={key}
    >
      <div
        className="w-full h-56 bg-themeBackground p-1 cursor-pointer"
        onClick={() => {
          window.open(testimonial.link, "_blank");
        }}
      >
        {isVideo(testimonial.link) ? (
          <Video
            urlEndpoint="https://ik.imagekit.io/pratikmaru"
            src={testimonial.link}
            className="w-full h-full object-cover rounded-md border border-border"
            controls
          />
        ) : (
          <Image
            urlEndpoint="https://ik.imagekit.io/pratikmaru"
            src={testimonial.link}
            className="w-full h-full object-cover rounded-md border border-border"
            alt={testimonial.title}
          />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-themeText">
            {testimonial.title}
          </h5>
          <p className="mb-3 font-normal text-themeText/70">
            {testimonial.desc.length > 100
              ? testimonial.desc.slice(0, 100) + "..."
              : testimonial.desc}
          </p>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <ActionButton
            style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50"
            onClick={onMoreInfo}
            text={"ℹ️ More details"}
          />

          {testimonial.gitHubLink && (
            <ActionButton
              style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50"
              onClick={() => {
                window.open(testimonial.gitHubLink, "_blank");
              }}
              text={"🔗 GitHub"}
            />
          )}
          {testimonial.liveLink && (
            <ActionButton
              style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50"
              onClick={() => {
                window.open(testimonial.liveLink, "_blank");
              }}
              text={"👁️ Live "}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
