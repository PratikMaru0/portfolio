import { useSelector } from "react-redux";
import { Button, Section } from "../components/common";
import Login from "../components/Login";
import Input from "../components/common/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [allowedUsers, setAllowedUsers] = useState([]);
  const admin = useSelector((store: { admin: any }) => store.admin);

  useEffect(() => {
    if (!admin) return;
    const fetchAllowedUsers = async () => {
      const users = await axios.get(BASE_URL + "/getAllowedUsers", {
        withCredentials: true,
      });
      setAllowedUsers(users.data);
    };
    fetchAllowedUsers();
  }, [admin]);

  const dashboardNavigation = () => {
    window.open("/admin/dashboard", "_blank");
  };

  if (!admin) {
    return <Login />;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-end my-2">
        <Button onClick={dashboardNavigation} text="Dashboard" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-6">
        <Section title="Add Admins">
          <div className="flex">
            <Input
              placeholder={"Enter a valid email address"}
              type="email"
              val={email}
              setVal={setEmail}
            />
            <Button text="Add+" style="rounded-l-sm ml-1" />
          </div>
        </Section>
        <Section title="Active Admins">
          <div className="text-themeText/80">No active admins yet.</div>
        </Section>
        <Section title="Approved Admins (Pending Registration)">
          <div className="text-themeText/80">No pending admins.</div>
        </Section>
      </div>
    </div>
  );
};

export default Admin;
