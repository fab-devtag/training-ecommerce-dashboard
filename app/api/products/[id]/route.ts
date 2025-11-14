import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✔ ici c'est une promesse
) {
  const { id } = await context.params; // ✔ il faut await

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const product = await res.json();
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
