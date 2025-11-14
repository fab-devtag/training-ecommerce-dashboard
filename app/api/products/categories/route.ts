import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) return NextResponse.error();
  const categories = await res.json();
  return NextResponse.json(categories);
};
