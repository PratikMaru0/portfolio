import { useState } from "react";
import Input from "./common/Input";
import { Button } from "./common";
import { Link } from "react-router-dom";
import { loginText } from "../constants/texts";
import useAuth from "../utils/useAuth.ts";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { handleLogin, handleSignUp } = useAuth();

  const handleBtnClick = (e: any) => {
    e.preventDefault();
    isLogin ? handleLogin(emailId, password) : handleSignUp(emailId, password);
  };

  return (
    <>
      <div className=" mt-20 flex items-center justify-center">
        <div className="rounded-2xl shadow-lg p-8 w-full max-w-sm border-2 border-border">
          <h2 className="text-3xl font-bold text-themeText mb-6 text-center">
            {isLogin ? loginText.loginHeading : loginText.signUpHeading}
          </h2>
          <form onSubmit={handleBtnClick}>
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
            <Button
              text={isLogin ? loginText.loginBtn : loginText.signupBtn}
              type="submit"
              style="w-full"
            />

            <p className="text-center mt-4 text-sm cursor-default">
              {isLogin ? loginText.dontHaveAccount : loginText.haveAccount}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-center mb-4 text-sm text-primary cursor-pointer"
              >
                {isLogin ? loginText.signUpHeading : loginText.loginHeading}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
