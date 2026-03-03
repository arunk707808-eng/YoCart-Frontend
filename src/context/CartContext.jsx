import { server } from "@/main";
import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/cart/fetch`, {
        withCredentials: true,
      });
      setCart(data.cart);
      setSubTotal(data.subTotal);
      setTotalItem(data.sumOfQuantity);
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/cart/add`,
        { product },
        { withCredentials: true },
      );
      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (action, id) => {
    setLoading(true);
    try {
      
      const { data } = await axios.post(
        `${server}/api/v1/cart/update?action=${action}`,
        { id },
        { withCredentials: true },
      );
     console.log("hello")
      fetchCart();
    } catch (error) {
      toast.error(
        error.response.data.message || "Problem occure in updating Cart",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeCart = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/cart/remove/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      fetchCart();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        subTotal,
        totalItem,
        setTotalItem,
        fetchCart,
        addToCart,
        removeCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CardData = () => useContext(CartContext);
