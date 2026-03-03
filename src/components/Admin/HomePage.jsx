import { ProductData } from "@/context/ProductContext";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import axios from "axios";
import { categories, server } from "@/main";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const {
    product,
    page,
    setPage,
    loading,
    setLoading,
    fetchProduct,
    totalPages,
  } = ProductData();
  const prevPage = () => {
    setPage(page - 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stock: "",
    price: "",
    category: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.images || formData.images?.length === 0) {
      toast.error("Please select images ");
      return;
    }
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          form.append("files", value[i]);
        }
      } else {
        form.append(key, value);
      }
    });


    try {
    
      const { data } = await axios.post(
        `${server}/api/v1/product/create`,
        form,
        { withCredentials: true },
      );

      toast.success(data.message);
      
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        images: null,
      });
      fetchProduct();
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">All Products</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">
              Add New Product
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <Label htmlFor="Title">Title</Label>
                  <Input
                    id="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="Description">Description</Label>
                  <Input
                    id="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="Stock">Stock</Label>
                  <Input
                    id="Stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Label htmlFor="Price">Price</Label>
                  <Input
                    type="number"
                    id="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Field>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border border-gray-200 rounded-md py-2 px-2 "
                >
                  <option value="">Select Category</option>
                  {categories?.map((e) => (
                    <option value={e} key={e} className="dark:text-black">
                      {e}
                    </option>
                  ))}
                </select>
                <Field>
                  <Label htmlFor="Images">Iamges</Label>
                  <Input
                    type="file"
                    id="Images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                </DialogClose>
                
                <Button type="submit" disabled={loading} className={loading ? "cursor-not-allowed":""}>
                  {loading?<Loader2 className="animate-spin w-4 h-4"/>:"Add Product"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {product && product.length > 0 ? (
            product.map((e) => {
              return <ProductCard product={e} key={e._id} latest={"no"} />;
            })
          ) : (
            <p>NO Products yet</p>
          )}
        </div>
      )}

      <div className="mt-4 mb-3">
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem className="cursor-pointer" onClick={prevPage}>
                <PaginationPrevious />
              </PaginationItem>
            )}

            {page !== totalPages && (
              <PaginationItem className="cursor-pointer" onClick={nextPage}>
                <PaginationNext />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HomePage;
