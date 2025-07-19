import React, { useState } from "react";

interface FileUploadProps {
  label?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  currentUrl?: string;
  setProfilePicUrl?: (url: string) => void;
}

const FileUpload = ({
  label,
  fileInputRef,
  currentUrl,
  setProfilePicUrl,
}: FileUploadProps) => {
  const [lastFileName, setLastFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !setProfilePicUrl) return;

    if (file.name === lastFileName) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProfilePicUrl(previewUrl);
    setLastFileName(file.name);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <div className="text-md font-medium">{label}</div>}

      <div className="border-2 rounded-lg p-5">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,application/pdf"
          className=" bg-themeBackground file-input file-input-bordered file-input-primary w-full mt-2"
          onChange={handleChange}
        />
        {currentUrl && (
          <div className="w-24 h-24 mt-2">
            {currentUrl.endsWith(".pdf") ? (
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center h-full w-full p-2 rounded-lg border border-primary bg-primary/10 hover:bg-primary/30 transition-colors duration-200 shadow-sm group"
              >
                {/* PDF Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary mb-1 group-hover:text-primary/80 transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span className="text-xs font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                  View PDF
                </span>
              </a>
            ) : (
              <a href={currentUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={currentUrl}
                  alt="Current file"
                  className="rounded-full object-cover border w-full h-full"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
