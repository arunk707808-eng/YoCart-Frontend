import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { CardData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { userData } from "@/context/UserContext";
import { categories, server } from "@/main";
import axios from "axios";
import { Edit, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const { singleProduct, reletedProducts, fetchSingleProduct, loading } =
    ProductData();
  const { addToCart } = CardData();
  const { isAuth, user } = userData();
  const { id } = useParams();
  const updateHandler = () => {
    setShow(!show);
    setTitle(singleProduct.title);
    setDescription(singleProduct.description);
    setCategory(singleProduct.category);
    setPrice(singleProduct.price);
    setStock(singleProduct.stock);
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const { data } = await axios.put(
        `${server}/api/v1/product/${id}`,
        { title, description, category, price, stock },
        { withCredentials: true },
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchSingleProduct(id);
      setTitle("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  
  const [updatedImages, setUpdatedImages] = useState(null);
  const updateImageHandler = async (e) => {
     e.preventDefault();
    setBtnLoading(true)
   
    if (!updatedImages || updatedImages.length === 0) {
      toast.error("Please select new image");
      return;
    }
    const formData = new FormData();
   for (let i = 0; i < updatedImages.length; i++) {
      formData.append("files", updatedImages[i]);
    }
   
    try {
      const { data } = await axios.post(
        `${server}/api/v1/product/${id}`,
        formData,
        { withCredentials: true },
      );
      toast.success(data.message);
      fetchSingleProduct(id);
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);
  const addToCartHandler = () => {
    addToCart(id);
  };
  return (
    <div className="px-4">
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <>
          <div className="container mx-auto py-8">
            <div className="flex flex-col lg:flex-row gap-14">
              <div className="w-full lg:max-w-140.5 relative">
                <Carousel className="relative">
                  <CarouselContent>
                    {singleProduct?.images?.map((img, index) => (
                      <CarouselItem key={index} >
                        <img
                          src={img.url}
                          alt="product"
                          className="w-full rounded-md"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className=" absolute left-4 lg:" />
                  <CarouselNext className="absolute right-4" />
                </Carousel>
                {user && user.role === "admin" && (
                  <>
                    <div
                      className="absolute right-2 top-2 bg-black text-white w-8 h-8 flex justify-center items-center rounded-sm"
                      onClick={() => setShow(true)}
                    >
                      <Edit onClick={updateHandler} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        accept="image/*"
                        className="border mt-2"
                        onChange={(e) => setUpdatedImages(e.target.files)}
                      />
                      <Button onClick={updateImageHandler} disabled={btnLoading}>{btnLoading?<Loader className="animate-spin"/>:"Update Image"}</Button>
                    </div>
                  </>
                )}
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold">{singleProduct?.title}</h1>
                <p className="text-lg">{singleProduct?.description}</p>
                <p className="text-xl font-semibold">
                  ₹ {singleProduct?.price}
                </p>

                {isAuth ? (
                  <>
                    {singleProduct.stock <= 0 ? (
                      <p>Out of Stock</p>
                    ) : (
                      <Button onClick={addToCartHandler}>Add to Cart</Button>
                    )}
                  </>
                ) : (
                  <p className="border border-2 w-1/2 text-center rounded-lg">
                    Please Login before Add to Card
                  </p>
                )}
              </div>
            </div>
          </div>

          {show && (
            <>
              <div className="fixed z-50 bg-black/50 inset-0 flex items-center justify-center p-4 ">
                <div className=" w-full max-w-2xl rounded-md space-y-8 overflow-y-auto bg-white p-4 relative">
                  <h1 className="font-bold mb-2">Update Your Product</h1>
                  <div className="space-y-2 w-full">
                    <Label>Product Title</Label>
                    <input
                      type="text"
                      className="p-2 w-full border rounded-sm"
                      placeholder="Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Product Description</Label>
                    <input
                      type="text"
                      className="p-2 w-full border rounded-sm"
                      placeholder="Product Title"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Product Category</Label>
                    <select
                      placeholder="Product Category"
                      className="p-2 w-full border rounded-sm"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((e, i) => (
                        <option value={e} key={i}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Product Price</Label>
                    <input
                      type="number"
                      className="p-2 w-full border rounded-sm"
                      placeholder="Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 ">
                    <Label>Product Stock</Label>
                    <input
                      type="number"
                      className="p-2 w-full border rounded-sm"
                      placeholder="Product Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <Button onClick={updateProduct} disabled={btnLoading}>
                    {btnLoading?<Loader className="animate-spin"/>:"Update"}
                  </Button>
                  <X
                    onClick={() => setShow(false)}
                    className="right-2 top-2 absolute"
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
      {reletedProducts?.length > 0 && (
        <>
          <h1 className="text-3xl my-6 font-semibold">Releted Product</h1>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {reletedProducts?.length > 0 ? (
                reletedProducts.map((e) => (
                  <ProductCard key={e._id} product={e} type="reletedProducts" />
                ))
              ) : (
                <p>No Product Yet</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
