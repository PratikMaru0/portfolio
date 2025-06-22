import { useState } from "react";
import Input from "./common/Input";
import { Button } from "./common";
import { Link } from "react-router-dom";
import { loginText } from "../constants/texts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAdmin } from "../utils/store/adminSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("pratikmarutest@gmail.com");
  const [password, setPassword] = useState("PraMaru123.@");
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addAdmin(res.data.admin));
    } catch (err: any) {
      console.log(err.message);
    }
    setEmailId("");
    setPassword("");
  };

  return (
    <div className=" mt-20 flex items-center justify-center">
      <div className="rounded-2xl shadow-lg p-8 w-full max-w-sm border-2 border-border">
        <h2 className="text-3xl font-bold text-themeText mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              label={loginText.email}
              placeholder={loginText.emailPlaceholder}
              type="email"
              val={emailId}
              setVal={setEmailId}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label={loginText.password}
              placeholder={loginText.passwordPlaceholder}
              type="password"
              val={password}
              setVal={setPassword}
              required
            />
          </div>

          <Link
            to="/forgotPassword"
            className="text-center block mb-2 text-sm text-primary"
          >
            {loginText.forgotPassword}
          </Link>
          <Button text="Login" type="submit" style="w-full rounded-lg mt-4" />

          <p className="text-center mt-4 text-sm">
            {loginText.dontHaveAccount}
            <Link
              to="/signup"
              className="text-center mb-4 text-sm text-primary"
            >
              {" "}
              {loginText.signUp}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
