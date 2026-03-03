import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CardData } from "@/context/CartContext";
import { server } from "@/main";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CardData();
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoding, setBtnLoading] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchAddress = async (id) => {
    try {
      const { data } = await axios.get(`${server}/api/v1/address/${id}`, {
        withCredentials: true,
      });
      setAddress(data.singleAddress);

    } catch (error) {
      console.log(error);
    }
  };
  const paymentHandler = async()=>{
    setBtnLoading(true)
    if(method==="cod"){
      setLoading(true)
 try {
       const {data} = await axios.post(`${server}/api/v1/order/new/cash`,{method, address:address.address, phone:address.phone},{withCredentials:true})
      toast.success(data.message)
      fetchCart()
      navigate("/orders")
    } catch (error) {
      console.log(error)
    }finally{
      setBtnLoading(false)
      setLoading(false)
    }
    }
   if(method==="online"){
    const stripePromise = loadStripe("pk_test_51Sw4w6LEKDw3uEladOgNuG4hDQS8JCoiizNoJFJiIMYCVakX3Xbd4bEm2zw8yqZHWZwNkJ6cNjH6Uwy4uoSp3xJh00quEvDeQe")
    try {
      setLoading(true)
      const stripe = await stripePromise
      const {data} =await axios.post(`${server}/api/v1/order/new/online`,{method, address:address.address, phone:address.phone},{withCredentials:true})
      if(data.url){
        window.location.href = data.url
        setLoading(false)
      }else{
        toast.error("failed to payment proccess")
        setLoading(false)
      }
      
    } catch (error) {
      toast.error("payment failed. please try again leter")
      setLoading(false)
    }
   }
   
  }
  useEffect(() => {
    fetchAddress(id);
  }, [id]);
  console.log(address);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-center">Proceed to pay</h1>
            <div>
              <h3 className="text-xl font-semibold">Products</h3>
              <Separator className="my-4" />
              <div className="space-y-4">
                {cart?.length > 0 &&
                  cart.map((e, i) => (
                    <div className=" flex flex-col border shadow-md rounded-md p-2" key={i}>
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={e.product.images[0].url}
                          alt=""
                          className="w-20 h-20 object-cover rounded"
                        />
                        <h3 className="font-semibold">{e.product.title}</h3>
                      </div>
                      <p className="text-gray-700 ">
                        ₹{e.product.price} X {e.quantity}
                      </p>
                    </div>
                  ))}
                  <h3 className="text-3xl font-semibold text-center ">Total Price to be Paid - ₹{subTotal}</h3>
              <Separator className="my-4" />
              <div className="flex flex-col border-2 rounded-md shadow-md p-4">
                <h3 className="text-xl font-semibold text-center">Address Details</h3>
                <Separator className="my-4" />
                <h3 className="font-semibold">Delevry address</h3>
                <p className="text-gray-500"> <strong>Address:</strong> {address.address} </p>
                <p className="text-gray-500"><strong>Phone:</strong>  {address.phone} </p>
                <label htmlFor="" className="block text-sm font-medium mb-2">
              Select Payment Method
            </label>
            <Select value={method} onValueChange={setMethod} >
              <SelectTrigger className="w-full md:w-60">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Method</SelectLabel>
                  <SelectItem value="cod">
                    Cash on Deleviry
                  </SelectItem>
                   <SelectItem value="online">
                    Online
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
              </div>
              <Button onClick={paymentHandler} className="w-full md:" disabled={!address || !cart.length === 0||!method||btnLoding}>
                {btnLoding?<Loader/>:"Proceed to Pay"}</Button>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
