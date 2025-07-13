import React, { use, useState } from "react";
import Input from "./common/Input";
import { Button } from "./common";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../utils/store/alertSlice";
import { useNavigate } from "react-router-dom";
import updatePwdTxt from "../constants/texts/updatePwdTxt";

const UpdatePassword = () => {
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isPasswordUpdate = await axios.patch(
        BASE_URL + "/updatePassword",
        {
          oldPassword: current,
          newPassword: newPassword,
          confirmNewPassword: confirm,
        },
        { withCredentials: true }
      );
      dispatch(
        addAlertMsg({ message: isPasswordUpdate.data.message, status: 200 })
      );
      navigate("/admin");
    } catch (err: any) {
      console.log(err);
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
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
          {updatePwdTxt.updatePwdHeading}
        </h2>
        <Input
          type="password"
          placeholder={updatePwdTxt.currentPasswordPlaceholder}
          val={current}
          setVal={setCurrent}
          required
        />
        <Input
          type="password"
          placeholder={updatePwdTxt.newPasswordPlaceholder}
          val={newPassword}
          setVal={setNewPassword}
          required
        />
        <Input
          type="password"
          placeholder={updatePwdTxt.confirmPasswordPlaceholder}
          val={confirm}
          setVal={setConfirm}
          required
        />

        <Button text={updatePwdTxt.submitBtn} style="w-full" type="submit" />
      </form>
    </div>
  );
};

export default UpdatePassword;
