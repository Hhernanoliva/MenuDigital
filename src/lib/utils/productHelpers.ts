import type { Product, ProcessedVariant } from '$lib/types/product';

export function processProductData(product: any): Product {
  // Process sizes and prices
  const sizes = product.variants_sizes
    ? product.variants_sizes.split(',').map((size: string) => size.trim()).filter(Boolean)
    : [];
  
  const prices = sizes.map((_, index) => {
    const price = product[`price_${index + 1}`];
    return price ? parseFloat(price.replace(/[^\d.]/g, '')) : null;
  }).filter((price): price is number => price !== null);

  const ofertaPrecios = sizes.map((_, index) => {
    const ofertaPrecio = product[`oferta_precio_${index + 1}`];
    return ofertaPrecio ? parseFloat(ofertaPrecio.replace(/[^\d.]/g, '')) : null;
  }).filter((price): price is number => price !== null);

  // Create size-price pairs with offer prices
  const sizeVariants: ProcessedVariant[] = sizes.map((size, index) => ({
    value: size,
    price: prices[index] ?? prices[0] ?? 0,
    ofertaPrecio: ofertaPrecios[index] ?? ofertaPrecios[0] ?? null
  }));

  // Process colors if they exist
  const colorVariants = product.variants_colors
    ? product.variants_colors.split(',')
        .map(color => color.trim())
        .filter(Boolean)
        .map(color => ({
          value: color,
          price: null,
          ofertaPrecio: null
        }))
    : [];

  // Process flavors if they exist
  const flavorVariants = product.variants_flavors
    ? product.variants_flavors.split(',')
        .map(flavor => flavor.trim())
        .filter(Boolean)
        .map(flavor => ({
          value: flavor,
          price: null,
          ofertaPrecio: null
        }))
    : [];

  // Calculate base price (use first price if available)
  const basePrice = prices[0] ?? 0;
  const baseOfertaPrecio = ofertaPrecios[0] ?? null;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image || 'https://placehold.co/400x300',
    category: product.category,
    marca: product.marca || '',
    variants: {
      ...(sizeVariants.length && { sizes: sizeVariants }),
      ...(colorVariants.length && { colors: colorVariants }),
      ...(flavorVariants.length && { flavors: flavorVariants })
    },
    basePrice,
    baseOfertaPrecio,
    ofertaPorcentaje: product.oferta_porcentaje
  };
}