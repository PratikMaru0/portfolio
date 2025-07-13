import { useState } from "react";
import Input from "./common/Input";
import { Button } from "./common";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../utils/store/alertSlice";
import forgotPwdTxt from "../constants/texts/forgotPwdTxt";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const mailSent = await axios.post(BASE_URL + "/forgotPassword", {
        emailId: email,
      });
      dispatch(addAlertMsg({ message: mailSent.data.message, status: 200 }));
    } catch (err: any) {
      console.log(err);
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
    }
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-xl shadow-lg p-8 max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          {forgotPwdTxt.forgotPwdHeading}
        </h2>
        <p className=" text-center mb-4">{forgotPwdTxt.forgotPwdDesc}</p>
        <Input
          type="email"
          placeholder={forgotPwdTxt.emailPlaceholder}
          val={email}
          setVal={setEmail}
          required
        />
        <Button text={forgotPwdTxt.submitBtn} type="submit" />
      </form>
    </div>
  );
};

export default ForgotPassword;
