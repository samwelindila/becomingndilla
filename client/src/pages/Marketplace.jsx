
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Package,
  MessageCircle,
  Search,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import PageHero from "../components/Common/PageHero";
import useContent from "../hooks/useContent";

import {
  profile,
  products as fallbackProducts,
  productCategories,
} from "../data/content";

const whatsappNumber = String(
  profile.whatsapp || profile.phone || ""
).replace(/[^\d]/g, "");

// Icons matching each product type
const typeIcon = {
  Course: GraduationCap,
  "E-book": BookOpen,
  Product: Package,
};

const categoryToType = {
  Courses: "Course",
  "E-books": "E-book",
  Products: "Product",
};

// Colors for each product type
const typeColors = {
  Course: {
    text: "text-violet-700",
    bg: "bg-violet-50",
    solid: "#7c3aed",
  },
  "E-book": {
    text: "text-sky-700",
    bg: "bg-sky-50",
    solid: "#0284c7",
  },
  Product: {
    text: "text-orange-700",
    bg: "bg-orange-50",
    solid: "#ea580c",
  },
};

// Format product prices
const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return "Ask for price";
  }

  if (price === 0) {
    return "Free";
  }

  return `TZS ${new Intl.NumberFormat("en-US").format(price)}`;
};

// Generate WhatsApp order link
const orderLink = (product) => {
  const message = [
    "Hello Ndilla,",
    "",
    `I would like to order: ${product.title} (${product.type}).`,
    `Price: ${formatPrice(product.price)}`,
    "",
    "Please send me the details and how to pay.",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
};

// Ordering process
const processSteps = [
  {
    number: "01",
    title: "Choose what you need",
    description:
      "Browse the courses, e-books and products and pick your favorite.",
  },
  {
    number: "02",
    title: "Order on WhatsApp",
    description:
      "Tap Order and your message arrives straight on my WhatsApp.",
  },
  {
    number: "03",
    title: "Confirm and receive",
    description:
      "We confirm payment and you get your product or course access.",
  },
];

// Product image component
function ProductImage({ src, alt, Icon }) {
  const [failed, setFailed] = useState(false);

  // Reset the error state whenever the image URL changes
  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      {/* Placeholder icon */}
      <Icon
        size={36}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
      />

      {/* Product image */}
      {src && !failed && (
        <img
          key={src}
          src={src}
          alt={alt || "Product image"}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      )}

      {/* Bottom image shade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(15,23,42,0.25), rgba(15,23,42,0))",
        }}
      />
    </div>
  );
}

export default function Marketplace() {
  // Load products from the backend
  const { data: products = [] } = useContent(
    "/products",
    fallbackProducts
  );

  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  // Filter products by category and search query
  const shown = products.filter((product) => {
    const matchesCategory =
      active === "All" ||
      product.type === categoryToType[active];

    const matchesQuery = (product.title || "")
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <PageHero
        label="Marketplace"
        title="Learn, read and build."
        text="Courses, e-books and products created to help you grow your skills and your business. Order in one tap on WhatsApp."
      />

      <section className="section !pt-4 md:!pt-6">
        <div className="container mx-auto max-w-5xl">

          {/* Introduction */}
          <div className="mb-9 flex flex-col gap-4 border-b border-[var(--border)] pb-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                The store
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--navy)] md:text-3xl">
                Resources made to be used.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] md:text-base">
                Everything here comes from real work in technology,
                design and business. Pick a course to learn from, an
                e-book to read, or a product to use, and order it
                directly with me.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-sm text-[var(--text-muted)]">
              <Sparkles
                size={16}
                className="text-[var(--accent)]"
              />
              <span>{products.length} items available</span>
            </div>
          </div>

          {/* Filters and search */}
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter products by category"
            >
              {productCategories.map((category) => {
                const selected = active === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={selected}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      selected
                        ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                        : "border-[var(--border)] bg-white text-[var(--text-muted)] hover:border-[var(--navy)] hover:text-[var(--navy)]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="relative w-full sm:w-60">
              <span className="sr-only">Search products</span>

              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-full border border-[var(--border)] bg-white py-2 pl-9 pr-3 text-xs outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </label>
          </div>

          {/* Product cards */}
          {shown.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--border)] px-5 py-12 text-center">
              <p className="font-semibold text-[var(--navy)]">
                No products found
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Try another category or a different search.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActive("All");
                  setQuery("");
                }}
                className="mt-3 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {shown.map((product, index) => {
                  const Icon =
                    typeIcon[product.type] || Package;

                  const colors =
                    typeColors[product.type] ||
                    typeColors.Product;

                  return (
                    <motion.article
                      key={product._id || product.slug || product.title}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.25,
                        delay: (index % 3) * 0.04,
                      }}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg"
                    >
                      {/* Product image and labels */}
                      <div className="relative">
                        <ProductImage
                          src={product.image || product.thumbnail || product.cover || ""}
                          alt={product.title}
                          Icon={Icon}
                        />

                        <span
                          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${colors.text}`}
                        >
                          <Icon size={12} strokeWidth={2.2} />
                          {product.type}
                        </span>

                        {product.badge && (
                          <span
                            className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                            style={{
                              backgroundColor: colors.solid,
                            }}
                          >
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Product details */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold leading-snug text-[var(--navy)]">
                          {product.title}
                        </h3>

                        <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text-muted)]">
                          {product.description}
                        </p>
                      </div>

                      {/* Price and WhatsApp order */}
                      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--bg-soft)]/60 px-5 py-4">
                        <div className="min-w-0">
                          <span className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                            Price
                          </span>

                          <span className="mt-1 block text-sm font-bold text-[var(--navy)]">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <a
                          href={
                            whatsappNumber
                              ? orderLink(product)
                              : undefined
                          }
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Order ${product.title} on WhatsApp`}
                          aria-disabled={!whatsappNumber}
                          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--navy)] px-3.5 py-2.5 text-xs font-semibold !text-white transition hover:bg-[var(--accent)] active:scale-95"
                        >
                          <MessageCircle size={14} />
                          Order
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* How ordering works */}
          <div className="mt-16 border-t border-[var(--border)] pt-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                How ordering works
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--navy)]">
                From choosing to receiving.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                No account and no complicated checkout. You message
                me, we confirm the details, and you get what you
                ordered.
              </p>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-3">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="border-l-2 border-[var(--accent)] pl-4"
                >
                  <span className="text-xs font-bold tracking-wider text-[var(--accent)]">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[var(--navy)]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
