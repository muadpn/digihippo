"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "../hooks/use-cart";
import { Product } from "@/payload-types";

const AddtoCardButton = ({product}: {product: Product}) => {
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);
  const {addItem} = useCart()
  useEffect(() => {
    const timerOut = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => {
      clearTimeout(timerOut);
    };
  }, [isSuccess]);
  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full "
    >
      {" "}
      {isSuccess ? "Added!" : "Add To Cart"}
    </Button>
  );
};

export default AddtoCardButton;
