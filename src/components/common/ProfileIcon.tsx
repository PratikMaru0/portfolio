import axios from "axios";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { removeAdmin } from "../../utils/store/adminSlice";
import { BASE_URL } from "../../utils/constants";
import { addAlertMsg } from "../../utils/store/alertSlice";

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
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const isUserLogout = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeAdmin());
      console.log(isUserLogout);
      dispatch(
        addAlertMsg({ message: isUserLogout.data.message, status: 200 })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end dropdown-hover">
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
          className="menu menu-sm dropdown-content bg-themeBackground text-themeText rounded-box z-1 w-52 p-2 border-2 border-border"
        >
          <li>
            <a className="font-bold justify-between text-center">
              <p>{email}</p>
            </a>
          </li>
          <li>
            <Button text="Logout" onClick={handleLogout} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileIcon;
