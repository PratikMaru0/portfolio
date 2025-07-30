import React from "react";
import CardModal from "../common/CardModal";
import imageKit from "../dashboard/utils/imageKit";
import { Video, Image } from "@imagekit/react";
import ActionButton from "../common/ActionButton";

interface TestimonialsMoreInfoProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: React.RefObject<HTMLDivElement | null>;
  data: {
    projectName: string;
    description: string;
    imageUrl: string;
    gitHubLink?: string;
    liveLink?: string;
    techStack?: string[];
    problemSolve?: string;
    [key: string]: any;
    _id?: string;
  };
}

const TestimonialsMoreInfo = ({
  openModal,
  setOpenModal,
  modalRef,
  data,
}: TestimonialsMoreInfoProps) => {
  if (!data) return null;
  const { isVideo } = imageKit();
  return (
    <CardModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalRef={modalRef}
      title={data.projectName}
      className="flex flex-col overflow-hidden max-h-[70vh] sm:max-h-[80vh]"
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 sm:space-y-3 px-2 sm:px-3 pb-2 -mx-1 sm:mx-0">
        {/* Main Content */}
        <div
          className="w-full h-32 sm:h-56 md:h-64 bg-themeBackground p-0.5 sm:p-1 rounded-lg cursor-pointer"
          onClick={() => window.open(data.imageUrl, "_blank")}
        >
          {isVideo(data.imageUrl) ? (
            <Video
              urlEndpoint="https://ik.imagekit.io/pratikmaru"
              src={data.imageUrl}
              className="w-full h-full object-cover rounded-lg border border-border"
              controls
            />
          ) : (
            <Image
              urlEndpoint="https://ik.imagekit.io/pratikmaru"
              src={data.imageUrl}
              className="w-full h-full object-cover rounded-lg border border-border"
              alt={data.projectName}
            />
          )}
        </div>

        <div className="space-y-1.5 bg-primary/20 rounded-lg p-2 sm:p-3">
          <div className="text-sm sm:text-base font-semibold mb-1">
            Description
          </div>
          <div className="text-xs sm:text-sm text-themeText/90 max-h-[80px] sm:max-h-[150px] overflow-y-auto whitespace-pre-line bg-primary/30 rounded-lg p-2 sm:p-3">
            {data.description}
          </div>
        </div>

        {data.problemSolve && (
          <div className="space-y-1.5 bg-primary/20 rounded-lg p-2 sm:p-3">
            <div className="text-sm sm:text-base font-semibold mb-1">
              Problem Solved
            </div>
            <div className="text-xs sm:text-sm text-themeText/90 whitespace-pre-line bg-primary/30 rounded-lg p-2 sm:p-4 max-h-[80px] sm:max-h-none overflow-y-auto overflow-x-hidden">
              {data.problemSolve}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {(data.techStack ?? []).length > 0 && (
          <div className="space-y-1.5 bg-primary/20 rounded-lg p-2.5 sm:p-4">
            <div className="text-sm sm:text-base font-semibold mb-1">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {(data.techStack ?? []).map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-primary/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] xs:text-xs border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-themeBackground/95 backdrop-blur-sm pt-2 pb-1 px-3 border-t border-border/20">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
          {data.gitHubLink && (
            <ActionButton
              style="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50 whitespace-nowrap"
              onClick={() => {
                window.open(data.gitHubLink, "_blank");
              }}
              text={"🔗 GitHub"}
            />
          )}
          {data.liveLink && (
            <ActionButton
              style="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50 whitespace-nowrap"
              onClick={() => {
                window.open(data.liveLink, "_blank");
              }}
              text={"👁️ Live "}
            />
          )}
        </div>
      </div>
    </CardModal>
  );
};

export default TestimonialsMoreInfo;
