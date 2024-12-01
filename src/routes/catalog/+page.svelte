<script lang="ts">
  import ProductCard from '$lib/components/ProductCard.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import ShoppingCart from '$lib/components/ShoppingCart.svelte';
  import InfoSection from '$lib/components/InfoSection.svelte';
  import PurchaseGuide from '$lib/components/PurchaseGuide.svelte';

  export let data;

  const whatsappNumber = '+1234567890';
  let selectedCategory = 'all';
  
  $: filteredProducts = selectedCategory === 'all' 
    ? data.products 
    : data.products.filter((p: any) => p.category === selectedCategory);

  $: categories = ['all', ...new Set(data.products.map((p: any) => p.category))];
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="w-full flex justify-center items-center flex-col mb-4 bg-color-button-principal py-6 rounded-xl">
    <img class="max-w-64  justify-center" src="logo-white.png" alt="Pet Shop Logo" />
    <h1 class="text-3xl font-bold text-center text-white pt-2">Catálogo de productos</h1>
  </div>
  
  <InfoSection />
  <PurchaseGuide />
  <CategoryFilter {categories} bind:selectedCategory />

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    {#each filteredProducts as product, i}
      <ProductCard {product} index={i} {whatsappNumber} />
    {/each}
  </div>

  <ShoppingCart {whatsappNumber} />
</div>