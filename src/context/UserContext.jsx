import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoding] = useState(true);
  const [btnLoading, setBtnLoding] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  async function loginUser(email, navigate) {
    setBtnLoding(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        email,
      });
      toast.success(data.message);
      localStorage.setItem("email", email);
      navigate("/verify");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoding(false);
    }
  }
  async function verifyUser(otp, navigate,fetchCart) {
    setBtnLoding(true);
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/verify`,
        {
          email,
          otp,
        },
        { withCredentials: true },
      );
      toast.success(data.message);
      localStorage.clear();
      navigate("/");
      setIsAuth(true);
      setUser(data.user);
      fetchCart();
      // Cookies.set("token", data.tokenData,{
      //   expires: 7,
      //   path:"/"
      // })
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoding(false);
    }
  }
  async function fatchUser() {
    setLoding(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/user/me`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoding(false);
    }
  }
  const logoutUser = async(navigate,setTotalItem)=>{
    try {
      const {data} = await axios.post(`${server}/api/v1/user/logout`,{},{withCredentials: true})
    toast.success(data.message);
    setIsAuth(false)
    setTotalItem(0)
    navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message || "logout error")
    }
  }
  useEffect(() => {
    fatchUser();
  }, []);
  return (
    <userContext.Provider
      value={{ user, loading, btnLoading, isAuth, loginUser, verifyUser,logoutUser }}
    >
      {" "}
      {children} <Toaster />{" "}
    </userContext.Provider>
  );
};

export const userData = () => useContext(userContext);
