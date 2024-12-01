import type { PageServerLoad } from './$types';
import { processProductData } from '$lib/utils/productHelpers';
import Papa from 'papaparse';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTg1Kt9dTK5LW5GoW1nQ-Qasp4Mh5jvu4L9UXrK4Dc-pkhJ1j-bMfuE1keOzGR2IG9qr3-wwbAr0LLE/pub?output=csv';
const CHCO_SIZES_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTg1Kt9dTK5LW5GoW1nQ-Qasp4Mh5jvu4L9UXrK4Dc-pkhJ1j-bMfuE1keOzGR2IG9qr3-wwbAr0LLE/pub?gid=1753914315&single=true&output=csv';
const POROTOS_SIZES_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTg1Kt9dTK5LW5GoW1nQ-Qasp4Mh5jvu4L9UXrK4Dc-pkhJ1j-bMfuE1keOzGR2IG9qr3-wwbAr0LLE/pub?gid=301225170&single=true&output=csv';

async function fetchSizeTable(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch size table');
    }

    const csvData = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error fetching size table:', error);
    return [];
  }
}

async function fetchProducts() {
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const csvData = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          const products = results.data
            .map((row: any) => ({
              id: row.id || String(Math.random()),
              name: row.name,
              description: row.description,
              image: row.image || 'https://placehold.co/400x300',
              category: row.category,
              variants_sizes: row.variants_sizes,
              variants_colors: row.variants_colors,
              variants_flavors: row.variants_flavors,
              price_1: row.price_1,
              price_2: row.price_2,
              price_3: row.price_3,
              price_4: row.price_4,
              price_5: row.price_5,
              oferta_precio_1: row.oferta_precio_1,
              oferta_precio_2: row.oferta_precio_2,
              oferta_precio_3: row.oferta_precio_3,
              oferta_precio_4: row.oferta_precio_4,
              oferta_precio_5: row.oferta_precio_5,
              marca: row.marca,
              oferta_porcentaje: row.oferta_porcentaje
                ? Number(row.oferta_porcentaje)
                : undefined,
            }))
            .filter((product: any) => product.name && product.description);

          console.log('Processed Products:', products);
          resolve(products);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const load: PageServerLoad = async () => {
  const [rawProducts, chcoSizes, porotosSizes] = await Promise.all([
    fetchProducts(),
    fetchSizeTable(CHCO_SIZES_URL),
    fetchSizeTable(POROTOS_SIZES_URL),
  ]);

  const processedProducts = (rawProducts as any[]).map(processProductData);

  return {
    products: processedProducts,
    sizeTables: {
      'ch&co': chcoSizes,
      porotos: porotosSizes,
    },
  };
};