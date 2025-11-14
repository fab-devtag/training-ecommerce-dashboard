import { AddToCartButton } from "@/app/components/AddToCartButton";
import { Product } from "@/app/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// ✅ Génère les métadonnées avec fallback
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // ISR 1 heure
    });

    if (!res.ok) {
      return {
        title: "Product Not Found",
        description: "This product does not exist",
      };
    }

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
  } catch (error) {
    // ✅ Fallback metadata si le fetch échoue
    return {
      title: "Product",
      description: "Loading product details...",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  let product: Product | null = null;
  let fetchError = false;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // ✅ ISR 1 heure
    });

    if (res.ok) {
      product = await res.json();
    } else if (res.status === 404) {
      // ✅ Si vraiment 404, afficher la page not-found
      notFound();
    }
  } catch (error) {
    fetchError = true;
    console.error("Product fetch error:", error);
  }

  // ✅ Fallback UI si pas de produit (mais pas un 404)
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <p className="font-bold">⏳ Loading product...</p>
          <p className="text-sm">
            {fetchError
              ? "Failed to load product. Please try again later."
              : "The page will refresh automatically."}
          </p>
        </div>
        {fetchError && (
          <a
            href="/products"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800"
          >
            ← Back to products
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-black rounded-lg shadow-white shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{product.rating.rate}</span>
              <span className="text-gray-400">
                ({product.rating.count} reviews)
              </span>
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
