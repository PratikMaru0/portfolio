import React, { useState } from "react";

interface FabAction {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
}

interface FabProps {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  actions?: FabAction[];
}

const Fab: React.FC<FabProps> = ({
  icon = "+",
  label,
  className,
  actions = [],
}) => {
  const [open, setOpen] = useState(false);

  const handleMainClick = () => {
    if (actions.length > 0) setOpen((prev) => !prev);
  };

  const handleActionClick = (action: FabAction) => {
    action.onClick();
    setOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Options */}
      {actions.length > 0 && open && (
        <div className="flex flex-col items-end gap-3 mb-2">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleActionClick(action)}
              className="w-12 h-12 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-100 transition-colors duration-200"
              aria-label={action.label || `Option ${idx + 1}`}
            >
              <span className="text-xl">{action.icon}</span>
            </button>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <button
        onClick={handleMainClick}
        className={`w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          className || ""
        }`}
        aria-label={label || "Floating Action Button"}
      >
        <span className="text-2xl">{icon}</span>
      </button>
    </div>
  );
};

export default Fab;
