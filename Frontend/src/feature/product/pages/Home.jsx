
import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";

const fallbackProducts = [
  {
    _id: "1",
    title: "Aurora Knit Jacket",
    description: "A lightweight layered jacket designed for cool evenings and everyday style.",
    seller: "Northstar Studio",
    priceAmount: 2499,
    priceCurrency: "INR",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "2",
    title: "Luna Leather Tote",
    description: "Premium vegan leather with a roomy interior and modern silhouette.",
    seller: "Mirelle Goods",
    priceAmount: 1899,
    priceCurrency: "INR",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "3",
    title: "Studio Desk Lamp",
    description: "Minimalist lighting for workspaces with warm, ambient illumination.",
    seller: "Atelier House",
    priceAmount: 1299,
    priceCurrency: "INR",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
  },
];

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await handleGetAllProducts();
        setProducts(Array.isArray(data) && data.length > 0 ? data : fallbackProducts);
      } catch (err) {
        console.error(err);
        setError("Showing preview products while the catalog syncs.");
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [handleGetAllProducts]);

  const addToCart = (productKey) => {
    setAddedProducts((prev) => (prev.includes(productKey) ? prev : [...prev, productKey]));
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="overflow-hidden rounded-[28px] border border-[#2a2a2a] bg-linear-to-br from-[#1b1b1b] via-[#161616] to-[#0f0f0f] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFD700]">
                Snitch • Discover more
              </span>
              <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Shop the best from trusted sellers in one place.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[#b9b4af] sm:text-base">
                Browse curated products, compare prices with confidence, and add your favorites to cart in seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-4 sm:min-w-60">
              <p className="text-sm text-[#999999]">Cart readiness</p>
              <p className="mt-2 text-3xl font-semibold text-[#FFD700]">{addedProducts.length}</p>
              <p className="text-sm text-[#b9b4af]">items added</p>
            </div>
          </div>
        </header>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-[#f2efe9]">Buyer’s picks</h2>
              <p className="text-sm text-[#999999]">Fresh arrivals from every seller</p>
            </div>
            <div className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-sm text-[#b9b4af]">
              {products.length} products available
            </div>
          </div>

          {error ? (
            <div className="mb-6 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/10 px-4 py-3 text-sm text-[#f7e7a5]">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-4">
                  <div className="h-48 rounded-xl bg-[#2a2a2a]" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-[#2a2a2a]" />
                  <div className="mt-3 h-3 w-full rounded bg-[#2a2a2a]" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-[#2a2a2a]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const productKey = product._id || product.id || `${product.title}-${product.seller}`;
                const isAdded = addedProducts.includes(productKey);
                const priceAmount = product.priceAmount ?? product.priceamount ?? 0;
                const priceCurrency = product.priceCurrency ?? product.pricecurrency ?? "INR";

                return (
                  <article
                    key={productKey}
                    className="group overflow-hidden rounded-3xl border border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700]/40 hover:shadow-2xl hover:shadow-[#FFD700]/10"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#0f0f0f] sm:h-60">
                      <img
                        src={product.image || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-transparent to-transparent" />
                    </div>

                    <div className="space-y-4 p-5 sm:p-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFD700]">
                          {product.seller}
                        </p>
                        <h3 className="text-xl font-semibold text-[#f2efe9]">{product.title}</h3>
                        <p className="text-sm leading-6 text-[#b9b4af]">{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-3">
                        <span className="text-sm text-[#999999]">Price</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-semibold text-[#FFD700]">{priceAmount}</span>
                          <span className="text-sm text-[#999999]">{priceCurrency}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(productKey)}
                        className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                          isAdded
                            ? "bg-[#2a2a2a] text-[#f2efe9]"
                            : "bg-[#FFD700] text-[#131313] hover:bg-yellow-500"
                        }`}
                      >
                        {isAdded ? "Added to cart" : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;