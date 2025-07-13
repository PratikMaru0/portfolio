import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./common/Input";
import { Button } from "./common";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../utils/store/alertSlice";
import { addAdmin } from "../utils/store/adminSlice";
import resetPwdTxt from "../constants/texts/resetPwdTxt";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const passwordReset = await axios.post(
        `${BASE_URL}/resetPassword/${token}`,
        {
          password,
        }
      );
      dispatch(
        addAlertMsg({ message: passwordReset.data.message, status: 200 })
      );
      dispatch(addAdmin(passwordReset.data.admin));
      navigate("/admin");
    } catch (err: any) {
      console.log(err);
      dispatch(
        addAlertMsg({
          message: err?.response?.data?.error,
          status: err?.response?.status || 500,
        })
      );
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          {resetPwdTxt.resetPwdHeading}
        </h2>
        <Input
          type="password"
          placeholder={resetPwdTxt.resetPwdPlaceholder}
          val={password}
          setVal={setPassword}
          required
        />

        <Button text={resetPwdTxt.submitBtn} style="w-full" type="submit" />
      </form>
    </div>
  );
};

export default ResetPassword;
