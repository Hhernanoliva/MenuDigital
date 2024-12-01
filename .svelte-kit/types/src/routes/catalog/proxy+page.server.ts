// @ts-nocheck
import type { PageServerLoad } from './$types';
import Papa from 'papaparse';
import type { Product, Category } from '$lib/types/product';

const PRODUCTS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvtGUlB4Wl53rEzE0ENaEspj7nduMVUK0bCNLZWO13njdshpxm2uLn0YkRE5jfHZuJmsywPmymddNE/pub?output=csv';
const CATEGORIES_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvtGUlB4Wl53rEzE0ENaEspj7nduMVUK0bCNLZWO13njdshpxm2uLn0YkRE5jfHZuJmsywPmymddNE/pub?gid=1032701465&single=true&output=csv';

async function fetchCSV(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const csvData = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function processProducts(rawProducts: any[]): Product[] {
  return rawProducts
    .filter(row => row.PRODUCTO && row.CATEGORY && row.PRECIO) // Ensure required fields exist
    .map((row, index) => ({
      id: `product-${index}`,
      name: row.PRODUCTO.trim(),
      price: parseFloat(row.PRECIO.replace(/\./g, '').replace(',', '.')) || 0,
      description: row.DESCRIPCION?.trim() || '',
      category: row.CATEGORY.toLowerCase().trim(),
      stock: row.STOCK?.toUpperCase().trim() === 'SI',
      image: row.images?.trim() || 'https://placehold.co/400x300',
      marca: row.marca?.trim() || '',
      variants: {
        sizes: processVariants(row.variants_sizes, row),
        colors: processVariants(row.variants_colors),
        flavors: processVariants(row.variants_flavors)
      },
      basePrice: parseFloat(row.PRECIO.replace(/\./g, '').replace(',', '.')) || 0,
      baseOfertaPrecio: row.oferta_precio ? parseFloat(row.oferta_precio.replace(/\./g, '').replace(',', '.')) : null,
      ofertaPorcentaje: row.oferta_porcentaje ? parseFloat(row.oferta_porcentaje) : null
    }));
}

function processVariants(variantString?: string, row?: any) {
  if (!variantString) return [];
  
  return variantString.split(',')
    .map(variant => variant.trim())
    .filter(Boolean)
    .map(value => ({
      value,
      price: null,
      ofertaPrecio: null
    }));
}

function processCategories(rawCategories: any[]): Category[] {
  return rawCategories
    .filter(row => row.CATEGORY?.trim() && row.IMG?.trim())
    .map(row => ({
      name: row.CATEGORY.toLowerCase().trim(),
      image: row.IMG.trim()
    }));
}

export const load = async () => {
  try {
    const [rawProducts, rawCategories] = await Promise.all([
      fetchCSV(PRODUCTS_URL),
      fetchCSV(CATEGORIES_URL)
    ]);

    const products = processProducts(rawProducts as any[]);
    const categories = processCategories(rawCategories as any[]);

    if (!products.length) {
      console.warn('No products were loaded from the spreadsheet');
    }

    if (!categories.length) {
      console.warn('No categories were loaded from the spreadsheet');
    }

    return {
      products,
      categories
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      products: [],
      categories: []
    };
  }
};;null as any as PageServerLoad;