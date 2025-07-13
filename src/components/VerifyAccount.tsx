import { useState } from "react";
import Input from "./common/Input";
import { Button } from "./common";
import { useLocation } from "react-router-dom";

import useAuth from "../utils/useAuth";

const verifyAccount = () => {
  const [otp, setOtp] = useState<number>();

  const location = useLocation();
  const email = location.state?.emailId;

  const { sendOtp, verifyOtp } = useAuth();

  return (
    <div>
      <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium ">
              <p>
                We have sent a code to your email{" "}
                {email.slice(0, 1) + "..." + email.slice(email.length - 11)}
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                <Input
                  style="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg"
                  type="text"
                  placeholder="Please enter 6-digit OTP"
                  val={otp}
                  maxLength={6}
                  setVal={setOtp}
                />
              </div>

              <div className="flex flex-col space-y-5">
                <Button
                  text="Verify account"
                  style="flex flex-row items-center justify-center text-center w-full border"
                  onClick={() => verifyOtp(otp)}
                />

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't recieve code?</p>{" "}
                  <div
                    className="text-primary cursor-pointer"
                    onClick={() => {
                      sendOtp(email);
                    }}
                  >
                    Resend
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default verifyAccount;
