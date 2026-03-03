import Product from "@/pages/Product";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const ProductCard = ({ product, type }) => {
  const navigate = useNavigate();
  return (
    <div>
      {product && (
        <div className="max-w-75 mx-auto shadow-md rounded-lg overflow-hidden border border-gray-200 ">
          <Link to={`/product/${product._id}`}>
            <div className="relative bg-white flex justify-center items-center">
              <img
                src={product.images[0]?.url}
                alt="Product"
                className="max-w-full h-40 md:h-75 object-contain md:object-contain overflow-hidden hover:scale-105"
              />

              {type === "new" && (
                <Badge
                  className={"absolute top-2 left-2 bg-pink-500 text-white"}
                >
                  New
                </Badge>
              )}
              {type === "mostSold" && (
                <Badge
                  className={"absolute top-2 left-2 bg-green-500 text-white"}
                >
                  Most Sold
                </Badge>
              )}
            </div>
          </Link>

          <div className="p-4">
            <h3 className="text-sm md:text-lg font-semibold truncate">
              {product.title.slice(0, 50)}
            </h3>
            <p className="text-[10px] md:text-sm mt-1 truncate">
              {product.description.slice(0, 50)}
            </p>
            <p className="text-sm mt-1 truncate">₹ {product.price}</p>

            <div className="flex items-center justify-end mt-2">
              <Button
                className="h-6 "
                onClick={() => navigate(`/product/${product._id}`)}
              >
                Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
