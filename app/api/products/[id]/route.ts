import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return NextResponse.error();

  const product = await res.json();
  return NextResponse.json(product);
}
