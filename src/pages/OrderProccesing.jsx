import { Button } from "@/components/ui/button";
import { CardData } from "@/context/CartContext";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function OrderProccesing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchCart } = CardData();

  const [loading, setLoading] = useState(true);
  const hasCalled = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    console.log("sessionId:", sessionId);

    // ⛔ jab tak sessionId nahi aaye, kuch mat karo
    if (!sessionId) return;

    // ⛔ double call protection
    if (hasCalled.current) return;
    hasCalled.current = true;

    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${server}/api/v1/order/verify/payment`,
          { sessionId },
          { withCredentials: true },
        );

        toast.success("Order placed successfully");
        fetchCart();

        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (error) {
        console.error("VERIFY ERROR:", error.response);
        toast.error(
          error.response?.data?.message || "Payment verification failed",
        );
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-r from-blue-100 to-blue-500">
      {loading ? (
        <div className="rounded-md max-w-lg shadow-lg text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
            Processing Order
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Please wait while we process your payment and order
          </p>
          <Loader className="mx-auto animate-spin" />
          <div className="text-xl text-gray-500 mt-2">Processing...</div>
        </div>
      ) : (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            Order Placed
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Thank you for shopping with us. Your order will be delivered soon.
          </p>
          <Button onClick={() => navigate("/orders")}>Go to order page</Button>
        </div>
      )}
    </div>
  );
}

export default OrderProccesing;
