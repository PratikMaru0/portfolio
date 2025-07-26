import React, { useEffect } from "react";
import Button from "./Button";

interface cardModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  children: React.ReactNode;
}
const CardModal = ({
  openModal,
  setOpenModal,
  modalRef,
  title,
  children,
}: cardModalProps) => {
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-themeBackground/80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-themeBackground border border-border rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] p-6 md:p-8 mx-4 text-themeText flex flex-col "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <h3 className="text-2xl font-bold text-themeText">{title}</h3>
          <Button
            onClick={() => setOpenModal(false)}
            style="ml-2 border-none px-0 py-0 hover:text-primary"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto pr-2 space-y-4 text-themeText/90 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
