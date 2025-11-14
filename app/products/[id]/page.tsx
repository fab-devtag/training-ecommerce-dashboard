import { AddToCartButton } from "@/app/components/AddToCartButton";
import { Product } from "@/app/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);

  const product: Product = await res.json();
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: Product = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  )
    .then((res) => res.json())
    .catch(() => notFound());

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-black rounded-lg shadow-white shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{product.rating.rate}</span>
              <span className="text-gray-400">{product.rating.count}</span>
            </div>
            <p className="text-3xl font-bold text-blue-300 mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="mb-6">
              <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {product.category}
              </span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
