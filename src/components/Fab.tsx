import React, { useState } from "react";

export interface FabAction {
  icon: string;
  url: string;
}

export interface FabProps {
  actions?: FabAction[];
}

const Fab: React.FC<FabProps> = ({ actions }: FabProps) => {
  const [open, setOpen] = useState(false);

  const handleActionClick = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Options */}
      {open && (
        <div className="flex flex-col items-end gap-3 mb-2 rounded-full p-2 bg-primary/80">
          {actions?.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleActionClick()}
              className="w-14 h-14 rounded-full bg-primary text-themeText shadow-md flex items-center justify-center hover:bg-primary/80 transition-colors duration-200 p-2 border border-white"
              type="button"
            >
              <a href={action.url} target="_blank" rel="noopener noreferrer">
                <img src={action.icon} alt="" />
              </a>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-16 h-16 rounded-full text-themeText shadow-lg flex items-center justify-center bg-primary/60 hover:bg-primary transition-colors duration-200 `}
        type="button"
      >
        <span className="text-xl">{open ? "❌" : "👀"}</span>
      </button>
    </div>
  );
};

export default Fab;
