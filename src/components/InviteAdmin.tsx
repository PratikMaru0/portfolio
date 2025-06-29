import { Button, Section } from "./common";
import Input from "./common/Input";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../utils/store/alertSlice";
import { adminTxt } from "../constants/texts";

interface inviteAdminProps {
  fetchInvitedAdmins: () => void;
  email: string;
  setEmail: (email: string) => void;
}

const InviteAdmin = ({
  fetchInvitedAdmins,
  email,
  setEmail,
}: inviteAdminProps) => {
  const dispatch = useDispatch();

  const addAdmin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/addUser",
        { emailId: email },
        { withCredentials: true }
      );
      dispatch(
        addAlertMsg({ message: res.data.message, status: res.data.status })
      );
    } catch (err: any) {
      console.log(err);
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
    }
    setEmail("");
    fetchInvitedAdmins();
  };

  return (
    <Section title={adminTxt.inviteAdmin}>
      <div>
        <div className="flex">
          <Input
            placeholder={adminTxt.validEmailPlaceholder}
            type="email"
            val={email}
            setVal={setEmail}
            required
          />
          <Button
            text={adminTxt.addBtn}
            style="rounded-l-sm ml-1"
            onClick={addAdmin}
          />
        </div>
        <div className="flex items-start gap-3 bg-themeBackground text-themeText/80 border border-border rounded-lg px-4 py-2 mb-3 shadow-sm min-w-0 mt-4">
          <span className="self-start pt-1">ⓘ</span>
          <span>{adminTxt.inviteAdminInfo}</span>
        </div>
      </div>
    </Section>
  );
};

export default InviteAdmin;
