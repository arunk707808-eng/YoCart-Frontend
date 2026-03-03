import CardSkeleton from "@/components/CardSkeleton";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductData } from "@/context/ProductContext";
import { Filter, X } from "lucide-react";

import React, { useState } from "react";

const Product = () => {
  const [show, setShow] = useState(false);
  const {
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
    loading,
    product,
  } = ProductData();
  // console.log("product:",product)
  const clearFilter = () => {
    setCategory("");
    setPrice("");
    setSearch("");
    setPage(1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  return (
    <div className="h-full p-4">
      <div className="flex flex-col md:flex-row h-full">
        <div
          className={`fixed inset-y-0 left-0 z-50 md:z-50 w-64 shadow-lg rounded-br-lg bg-white dark:bg-neutral-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 md:hidden"
            >
              <X />
            </button>
            <h2 className="text-lg font-bold mb-2">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Search Title
              </label>
              <Input
                type="text"
                placeholder="Search Title"
                className="w-full p-2 border rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-2">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((e) => {
                      return (
                        <SelectItem value={e} key={e}>
                          {e}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-2">
                Price
              </label>
              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Price</SelectLabel>
                    <SelectItem value="lowToHigh">Low to High</SelectItem>
                    <SelectItem value="highToLow">High to Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Button onClick={clearFilter}>Clear Filter</Button>
            </div>
          </div>
        </div>
        <div
          className=" fixed z-30 flex-1 p-4 md:hidden"
          onClick={() => setShow(true)}
        >
          <Button>
            <Filter />
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i}/>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {product && product.length > 0 ? (
              product.map((e) => {
                return <ProductCard key={e._id} product={e} type={"no"} />;
              })
            ) : (
              <p>No Product Yet</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-8 p-4">
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} />
              </PaginationItem>
            )}
            {page !== totalPages && (
              <PaginationItem>
                <PaginationNext onClick={nextPage} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Product;
