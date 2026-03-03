import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userData } from "@/context/UserContext";
import { Loader, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  
  const submitHandler= ()=>{
    loginUser(email, navigate)
  }
  const {loginUser, btnLoading} = userData()
  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button disabled = {btnLoading} type="submit" className="w-full" onClick={submitHandler}>
            {btnLoading?<Loader/>:"Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
