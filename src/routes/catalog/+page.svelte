<script lang="ts">
  import { cart } from '$lib/stores/cart';
  import CategoryList from '$lib/components/CategoryList.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import ShoppingCart from '$lib/components/ShoppingCart.svelte';
  import PurchaseGuide from '$lib/components/PurchaseGuide.svelte';
  import InfoSection from '$lib/components/InfoSection.svelte';
  import type { Product, Category } from '$lib/types/product';

  export let data;

  const whatsappNumber = '+1234567890'; // Replace with actual number
  let selectedCategory = 'all';
  
  $: products = data.products as Product[];
  $: categories = data.categories as Category[];
  $: filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="w-full flex justify-center items-center flex-col mb-8">
    <img class="max-w-64 mb-4" src="https://rstr.in/xhy241m7cri4uc/somospepes/MBaKGcPgOnW" alt="Pet Shop Logo" />
    <h1 class="text-3xl font-bold text-center color-font-principal">Somos Pepés</h1>
  </div>

  <PurchaseGuide />
  <InfoSection />

  <CategoryList 
    {categories} 
    bind:selectedCategory 
  />

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {#each filteredProducts as product, index}
      <ProductCard 
        {product}
        {index}
        {whatsappNumber}
      />
    {/each}
  </div>

  <ShoppingCart {whatsappNumber} />
</div>