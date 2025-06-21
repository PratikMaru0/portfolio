import { Button, Toast } from "../components/common";

const Admin = () => {
  const dashboardNavigation = () => {
    window.open("/admin/dashboard", "_blank");
  };
  return (
    <div>
      <Button onClick={dashboardNavigation} text={"Goto Dashboard"} />
      <Toast message="Redirected to Admin Dashboard" type="success" />
    </div>
  );
};

export default Admin;
