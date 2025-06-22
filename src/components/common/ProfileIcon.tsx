import React from "react";

interface ProfileIconProps {
  email: string;
}

const bgColors = [
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-orange-400",
];

function getRandomColor(email: string) {
  const idx = email ? email.charCodeAt(0) % bgColors.length : 0;
  return bgColors[idx];
}

const ProfileIcon = ({ email }: ProfileIconProps) => {
  const firstChar = email ? email[0].toUpperCase() : "?";
  const bgColor = getRandomColor(email);

  return (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div
            className={`w-10 flex items-center justify-center rounded-full text-2xl font-bold ${bgColor}`}
          >
            {firstChar}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileIcon;
