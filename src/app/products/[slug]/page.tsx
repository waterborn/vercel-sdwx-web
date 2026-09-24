import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/app/components/ProductCard';
import { ArrowRight, ArrowUpRight } from '@/app/components/Icons';
import { categoryName, getProduct, products } from '@/data/products';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const otherProducts = products.filter((item) => item.id !== product.id);
  const relatedProducts = [
    ...otherProducts.filter((item) => item.category === product.category),
    ...otherProducts.filter((item) => item.category !== product.category),
  ].slice(0, 3);

  return (
    <main id="main-content" className="bg-[#faf9f6] pt-8 pb-20 text-[#252822]">
      <div className="site-container">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#68705c]">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link href="/collections" className="transition-colors hover:text-[#252822] hover:underline">
                Collections
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252822]">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative aspect-square overflow-hidden rounded-none bg-[#f0eeea] lg:sticky lg:top-28">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              preload
              sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 50vw, 650px"
              className="object-contain p-6 sm:p-10"
            />
          </div>

          <div className="lg:py-3">
            <p className="eyebrow text-[#68705c]">{categoryName(product.category)}</p>
            <h1 className="mt-4 text-[40px] leading-[1.08] font-normal tracking-[-0.045em] lg:text-[56px]">
              {product.name}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-[#68705c]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              {product.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#252822]/75">
              {product.description}
            </p>

            <section aria-labelledby="specifications-heading" className="mt-8">
              <h2 id="specifications-heading" className="eyebrow mb-4">Product details</h2>
              <dl className="border-t border-[#252822]/15 text-sm">
                {product.specifications.map((specification) => (
                  <div key={specification.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-5 border-b border-[#252822]/15 py-3.5">
                    <dt className="text-[#68705c]">{specification.label}</dt>
                    <dd className="leading-6">{specification.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-5 border-b border-[#252822]/15 py-3.5">
                  <dt className="text-[#68705c]">Listed minimum order</dt>
                  <dd className="leading-6">{product.minOrder}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-5 text-[#68705c]">
                Minimum quantities, options and availability are confirmed on the supplier listing.
              </p>
            </section>

            <div className="mt-8">
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-dark w-full justify-between sm:w-auto sm:min-w-72"
              >
                View supplier listing
                <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4"><ArrowUpRight /></span>
              </a>
              <p className="mt-3 text-xs leading-5 text-[#68705c]">
                Opens our external marketplace listing in a new tab.
              </p>
              <Link href="/#contact" className="text-link mt-5 inline-flex items-center gap-3 text-sm">
                Bulk orders &amp; enquiries
                <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4"><ArrowRight /></span>
              </Link>
            </div>

            <div className="mt-9 border-t border-[#252822]/15">
              <details className="border-b border-[#252822]/15 py-5">
                <summary className="cursor-pointer text-sm font-medium">Ordering &amp; availability</summary>
                <p className="mt-4 text-sm leading-6 text-[#68705c]">
                  This website is a product collection, not a checkout. Visit the supplier listing to confirm current availability, minimum quantities, options, lead times and delivery terms before placing an order. For bulk enquiries, get in touch through our contact section.
                </p>
              </details>
              <details className="border-b border-[#252822]/15 py-5">
                <summary className="cursor-pointer text-sm font-medium">Materials &amp; sizing</summary>
                <p className="mt-4 text-sm leading-6 text-[#68705c]">
                  The details above reflect the supplier listing. Confirm the material composition, measurements, sizing and care instructions for your chosen option directly with the supplier before ordering. Images are a reference; check the exact color and finish on the listing.
                </p>
              </details>
            </div>
          </div>
        </div>

        <section aria-labelledby="related-products-heading" className="mt-20 border-t border-[#252822]/15 pt-12 lg:mt-28 lg:pt-16">
          <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#68705c]">Keep exploring</p>
              <h2 id="related-products-heading" className="mt-3 text-3xl leading-tight font-normal tracking-[-0.035em] sm:text-4xl">
                More for your <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>practice.</span>
              </h2>
            </div>
            <Link href="/collections" className="text-link inline-flex items-center gap-3 text-sm">
              Explore the collection
              <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4"><ArrowRight /></span>
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
