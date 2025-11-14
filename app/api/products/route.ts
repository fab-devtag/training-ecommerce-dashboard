import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) return NextResponse.error();
  const products = await res.json();
  return NextResponse.json(products);
};
