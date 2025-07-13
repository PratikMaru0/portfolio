import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./constants";
import { addAdmin } from "./store/adminSlice";
import { addAlertMsg } from "./store/alertSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendOtp = async (email: string) => {
    try {
      const res = await axios.post(
        BASE_URL + "/sendVerificationCode",
        {
          emailId: email,
        },
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
  };

  const verifyOtp = async (otp: any) => {
    try {
      const res = await axios.post(
        BASE_URL + "/verifyOTP",
        { otp: otp },
        { withCredentials: true }
      );
      dispatch(
        addAlertMsg({ message: res.data.message, status: res.data.status })
      );
      dispatch(
        addAdmin({
          ...res.data.admin,
        })
      );
      console.log(res.data.admin);
      navigate("/admin");
    } catch (err: any) {
      console.log(err);
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
    }
  };

  const handleLogin = async (emailId: string, password: string) => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addAdmin(res.data.admin));
      dispatch(
        addAlertMsg({ message: res.data.message, status: res.data.status })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({
          message: err.response?.data?.error || "Something went wrong",
          status: err.response?.status || 500,
        })
      );
      if (err.response.status === 403) {
        navigate("/admin/verify", { state: { emailId } });
        sendOtp(emailId);
      }
    }
  };

  const handleSignUp = async (emailId: string, password: string) => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addAdmin(res.data.admin));
      dispatch(
        addAlertMsg({ message: res.data.message, status: res.data.status })
      );
      sendOtp(emailId);
      navigate("/admin/verify", { state: { emailId } });
    } catch (err: any) {
      dispatch(
        addAlertMsg({
          message: err.response?.data?.error || "Something went wrong",
          status: err.response?.status || 500,
        })
      );
    }
  };

  return { handleLogin, handleSignUp, sendOtp, verifyOtp };
};

export default useAuth;
