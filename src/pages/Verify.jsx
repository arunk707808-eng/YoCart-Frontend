import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CardData } from "@/context/CartContext";
import { userData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { loginUser, btnLoading, verifyUser } = userData();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const {fetchCart} = CardData();
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const formateTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  const submitHandler = () => {
    verifyUser(Number(otp), navigate, fetchCart);
  };
  const otpHandler = async () => {
    const email = localStorage.getItem("email");
    await loginUser(email, navigate);
    setTimer(30);
    setCanResend(false);
  };
  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle>Account verification</CardTitle>
          <CardDescription>
            Enter your otp below to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Field className="w-fit">
                  <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
                  <InputOTP
                    id="digits-only"
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </Field>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-[12px]">
            {canResend
              ? "You can now resend OTP"
              : `Time remaining:${formateTime(timer)}`}
          </p>
          <Button
            disabled={btnLoading}
            type="submit"
            className="w-full"
            onClick={submitHandler}
          >
            {btnLoading ? <Loader /> : "Submit"}
          </Button>

          <Button
            disabled={!canResend || btnLoading}
            type="submit"
            className="w-full"
            onClick={otpHandler}
          >
            {btnLoading?<Loader/> :"Resend OTP"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
