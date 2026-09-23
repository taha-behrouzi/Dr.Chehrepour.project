"use client";

import React, { useState } from "react";
import DiscountForm from "@/components/DiscountForm";

export default function CheckoutPage() {
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const basePrice = 250000;
  const finalPrice = basePrice - basePrice * (discountPercent / 100);

  return (
    <main
      className="min-h-screen bg-