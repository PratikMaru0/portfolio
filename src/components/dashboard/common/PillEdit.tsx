import React from "react";
import ActionButton from "../../common/ActionButton";

const PillEdit = ({
  idx,
  link,
  setConfirmModalOpen,
  setIdx,
  ariaLabel,
}: any) => {
  return (
    <>
      <li
        key={idx}
        className="flex items-center bg-primary/10 border border-primary/70 px-3 py-1 rounded shadow text-xs"
      >
        <span className="truncate max-w-[120px]">{link}</span>
        <ActionButton
          text={"❌"}
          onClick={() => {
            setConfirmModalOpen(true);
            setIdx(idx);
          }}
          aria-label={ariaLabel}
          style="ml-2"
        />
      </li>
    </>
  );
};

export default PillEdit;
