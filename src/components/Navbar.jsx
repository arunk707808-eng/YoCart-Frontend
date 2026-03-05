import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { userData } from "@/context/UserContext";
import { CardData } from "@/context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {isAuth, user,logoutUser } = userData();
  const {totalItem,setTotalItem} = CardData();
  const handleLogout = () => {
    logoutUser(navigate,setTotalItem);
  };
  return (
    <div className="z-50 sticky top-0 bg-background/50 border-b backdrop-blur px-2">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link to={"/"}>
         <h1 className="text-2xl font-bold">YoCart</h1>
        </Link>
       
        <ul className="flex justify-center items-center space-x-6">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="cursor-pointer" onClick={() => navigate("/product")}>
            Product
          </li>
          <li
            className="cursor-pointer relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-7 relative" />
            <span className="absolute bg-red-500 text-white font-bold w-5 h-5 rounded-full flex justify-center items-center -top-2 -right-2">
              {totalItem}
            </span>
          </li>
          <li className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {isAuth ? <LogOut /> : <User/>}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!isAuth ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/login")}>
                      Login
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      My Orders
                    </DropdownMenuItem>

                   {user.role === "admin" && <DropdownMenuItem
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Dashboard
                    </DropdownMenuItem>
                    } 

                    {isAuth && (
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <ModeToggle />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
