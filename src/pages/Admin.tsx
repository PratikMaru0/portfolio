import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/common";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addAlertMsg } from "../utils/store/alertSlice";
import Confirm from "../components/common/Confirm";
import InviteAdmin from "../components/InviteAdmin";
import ActiveAdmins from "../components/ActiveAdmins";
import InvitedAdmins from "../components/InvitedAdmins";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [invitedAdmins, setInvitedAdmin] = useState<string[]>([]);
  const [activeAdmins, setActiveAdmins] = useState<string[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");

  const admin = useSelector((store: { admin: any }) => store.admin);
  const dispatch = useDispatch();

  const fetchInvitedAdmins = async () => {
    const users = await axios.get(BASE_URL + "/getAllowedUsers", {
      withCredentials: true,
    });
    setInvitedAdmin(users.data.data);
  };

  const fetchActiveAdmins = async () => {
    const admins = await axios.get(BASE_URL + "/getAdmins", {
      withCredentials: true,
    });
    setActiveAdmins(admins.data.data);
  };

  const handleRevokeAdminAccess = async (email: string) => {
    try {
      const isAdminRemoved = await axios.delete(BASE_URL + "/removeUser", {
        data: { emailId: email },
        withCredentials: true,
      });
      fetchInvitedAdmins();
      fetchActiveAdmins();
      dispatch(
        addAlertMsg({
          message: isAdminRemoved.data.message,
          status: isAdminRemoved.data.status,
        })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({
          message: err.response.data.error,
          status: err.response.status,
        })
      );
    }
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    if (!admin) return;
    fetchInvitedAdmins();
    fetchActiveAdmins();
  }, [admin, setEmail]);

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
        <InviteAdmin
          fetchInvitedAdmins={fetchInvitedAdmins}
          email={email}
          setEmail={setEmail}
        />
        <ActiveAdmins
          activeAdmins={activeAdmins}
          setActiveAdmins={setActiveAdmins}
          setConfirmModalOpen={setConfirmModalOpen}
          setDeleteEmail={setDeleteEmail}
        />
        <InvitedAdmins
          invitedAdmins={invitedAdmins}
          setConfirmModalOpen={setConfirmModalOpen}
          setDeleteEmail={setDeleteEmail}
        />
        <Confirm
          open={confirmModalOpen}
          onCancel={() => setConfirmModalOpen(false)}
          onConfirm={() => handleRevokeAdminAccess(deleteEmail)}
          message={""}
        />
      </div>
    </div>
  );
};

export default Admin;
