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
    >
      <div className="space-y-6">
        <div
          className="w-full h-64 bg-themeBackground p-1 rounded-lg cursor-pointer"
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

        <div className="space-y-2 bg-primary/20 rounded-lg p-4">
          <div className="text-lg font-semibold">Description</div>
          <div className="text-sm text-themeText/90 max-h-[150px] overflow-y-auto whitespace-pre-line bg-primary/30 rounded-lg p-4">
            {data.description}
          </div>
        </div>

        {data.problemSolve && (
          <div className="space-y-2 bg-primary/20 rounded-lg p-4">
            <div className="text-lg font-semibold">Problem Solved</div>
            <div className="text-sm text-themeText/90 whitespace-pre-line bg-primary/30 rounded-lg p-4">
              {data.problemSolve}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {data.techStack?.length && (
          <div className="space-y-2 bg-primary/20 rounded-lg p-4">
            <div className="text-lg font-semibold">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {data.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-primary/30 px-2 py-1 rounded text-xs border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 justify-end pt-2">
          {data.gitHubLink && (
            <ActionButton
              style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50"
              onClick={() => {
                window.open(data.gitHubLink, "_blank");
              }}
              text={"🔗 GitHub"}
            />
          )}
          {data.liveLink && (
            <ActionButton
              style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-themeText bg-primary rounded-lg hover:bg-primary/60 bg-primary/50"
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
