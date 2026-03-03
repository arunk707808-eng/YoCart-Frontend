import { server } from "@/main";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [mostSoldProduct, setMostSoldProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  async function fetchProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/api/v1/product/all?search=${search}&category=${category}&sortByPrice=${price}&page=${page}`,
      );
      setProduct(data.product);
      setNewProduct(data.letestProducts);
      setMostSoldProduct(data.mostSoldProduct);
      setCategories(data.categories);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  const [singleProduct, setSingleProduct] = useState([])
  const [reletedProducts, setReletedProducts] = useState([])
  const fetchSingleProduct = async(id)=>{
    setLoading(true)
    try {
      const {data} = await axios.get(`${server}/api/v1/product/${id}`)
    setSingleProduct(data.product)
    setReletedProducts(data.reletedProducts)

    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
    }
  
  useEffect(() => {
    fetchProduct();
  }, [search, page, price, category]);
  return (
    <ProductContext.Provider
      value={{
        loading,
        newProduct,
        product,
        mostSoldProduct,
        totalPages,
        categories,
        category,
        setCategory,
        price,
        setPrice,
        page,
        setPage,
        search,
        setSearch,
        singleProduct,
        reletedProducts,
        fetchSingleProduct,
        fetchProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const ProductData = () => useContext(ProductContext);
