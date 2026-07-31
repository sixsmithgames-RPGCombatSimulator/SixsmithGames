/** Public, read-only view of the approved merchandise catalog for Operations. */

import { NextResponse } from 'next/server';

import { MERCH_PRODUCTS } from '@/lib/merchCatalog';

/** Returns only public fields for products with a verified Fourthwall listing. */
export function GET() {
  const products = MERCH_PRODUCTS.flatMap((product) => {
    if (!product.shopUrl || !product.shopPrice) return [];

    return [{
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.shopPrice,
      freeStudioMonths: product.freeStudioMonths,
      shopUrl: product.shopUrl,
    }];
  });

  return NextResponse.json(
    { products },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
