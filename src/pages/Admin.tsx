import { Button } from "../components/common";
import Login from "../components/Login";

const Admin = () => {
  const dashboardNavigation = () => {
    window.open("/admin/dashboard", "_blank");
  };
  return (
    <div>
      <Login />
      {/* <Button onClick={dashboardNavigation} text="Content Management" /> */}
    </div>
  );
};

export default Admin;
